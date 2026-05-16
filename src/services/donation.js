import donationRepo from "../repositories/donation.js";
import acceptRepo from "../repositories/accept.js";

export default {
  async createDonation(donationData) {
    const { uidx, title, duedate, exercise, study, music, game, clean, text, accept } = donationData;
    
    // 1. 게시글 생성
    const didx = await donationRepo.create({
      status: 1, // 모집 중
      writerIdx: uidx,
      title,
      text,
      duedate,
      exercise,
      study,
      music,
      game,
      clean
    });

    // 2. 역할(accept) 생성
    if (accept && Array.isArray(accept)) {
      for (const roleInfo of accept) {
        await acceptRepo.create({
          status: 0, // 신청 가능
          didx,
          uidx: null,
          role: roleInfo.role,
          point: roleInfo.point
        });
      }
    }

    return didx;
  },

  async getDonations() {
    return await donationRepo.findAll();
  },

  async getDonationDetail(didx) {
    return await donationRepo.findById(didx);
  },

  async updateStatus(didx, status) {
    await donationRepo.updateStatus(didx, status);
    return true;
  }
};
