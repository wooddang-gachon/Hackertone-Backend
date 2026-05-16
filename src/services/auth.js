import userRepo from "../repositories/users.js";
import tempRepo from "../repositories/temp.js";

export default {
  async createOtp(gachon_id) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6자리 난수
    const tidx = await tempRepo.create(gachon_id, otp);
    // 실제 메일 발송 로직은 메일 서비스 연동 필요 (api spec #5 참고)
    return { tidx, otp };
  },

  async verifyOtp(tidx, otp) {
    const temp = await tempRepo.findById(tidx);
    if (!temp || temp.otp !== otp) {
      return false;
    }
    // 인증 성공 시 temp 데이터 삭제는 선택 사항
    return true;
  },

  async signUp(user) {
    return await userRepo.create(user);
  },

  async login(gachon_id, password) {
    const user = await userRepo.findByGachonId(gachon_id);
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
};
