import userRepo from "../repositories/users.js";
import tempRepo from "../repositories/temp.js";
import config from "../config/index.js";

export default {
  async createOtp(gachon_id) {
    // 기가입자 체크
    const existingUser = await userRepo.findByGachonId(gachon_id);
    if (existingUser) {
      throw new Error("ALREADY_REGISTERED");
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6자리 난수
    const tidx = await tempRepo.create(gachon_id, otp);

    console.log("Created OTP for gachon_id:", gachon_id, "with tidx:", tidx);

    // 이메일 수신자 설정 (gachon_id에 @가 포함되어 있으면 그대로 사용, 없으면 도메인 추가)
    const emailTo = gachon_id.includes("@") ? gachon_id : `${gachon_id}@gachon.ac.kr`;

    // 실제 메일 발송 로직 (Resend API 연동)
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "GDGoC Gachon <no-replay@gdgoc.net>",
          to: [emailTo],
          subject: "[GDGoC Gachon] 인증 번호 안내",
          html: `가천대 재능 기부 플랫폼 인증 번호는 <strong>${otp}</strong> 입니다.`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API Error:", errorData);
      }
    } catch (err) {
      console.error("Failed to send email:", err);
    }

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
    const uidx = await userRepo.create(user);
    await tempRepo.deleteByGachonId(user.gachon_id);
    return uidx;
  },

  async login(gachon_id, password) {
    const user = await userRepo.findByGachonId(gachon_id);
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
};
