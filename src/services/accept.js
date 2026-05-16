import acceptRepo from "../repositories/accept.js";
import donationRepo from "../repositories/donation.js";
import userRepo from "../repositories/users.js";

export default {
  async getAcceptDetails(didx) {
    return await acceptRepo.findByDidx(didx);
  },

  async subscribeRole(aidx, uidx) {
    const accept = await acceptRepo.findById(aidx);
    if (!accept || accept.uidx !== null) return false;
    await acceptRepo.updateUidx(aidx, uidx);
    return true;
  },

  async cancelRole(aidx) {
    const accept = await acceptRepo.findById(aidx);
    if (!accept) return false;
    await acceptRepo.cancelUidx(aidx);
    return true;
  },

  async approveRole(aidx) {
    const accept = await acceptRepo.findById(aidx);
    if (!accept || accept.status !== 1 || !accept.uidx) return false;

    const donation = await donationRepo.findById(accept.didx);
    if (!donation) return false;

    // 1. 상태 변경 (2: 포인트 지급 승인)
    await acceptRepo.updateStatus(aidx, 2);

    // 2. 포인트 정산
    // 작성자 포인트 차감
    await userRepo.updatePoints(donation.writerIdx, -accept.point);
    // 수락자 포인트 가산
    await userRepo.updatePoints(accept.uidx, accept.point);

    // 3. 능력치 상승
    const tags = {
      exercise: donation.exercise,
      study: donation.study,
      music: donation.music,
      game: donation.game,
      clean: donation.clean
    };
    await userRepo.updateTags(accept.uidx, tags);

    return true;
  },

  async refuseRole(aidx) {
    const accept = await acceptRepo.findById(aidx);
    if (!accept || accept.status !== 1) return false;

    // 상태 변경 (3: 포인트 지급 반려)
    await acceptRepo.updateStatus(aidx, 3);
    return true;
  }
};
