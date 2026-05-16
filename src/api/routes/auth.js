import { Router } from "express";
import authService from "../../services/auth.js";

const route = Router();

export default (app) => {
  app.use("/", route);

  // api spec #1: 인증 이메일 발신
  route.post("/signUp/createOtp", async (req, res) => {
    const { gachon_id } = req.body;
    console.log("Received createOtp request for gachon_id:", gachon_id);
    try {
      const result = await authService.createOtp(gachon_id);
      res.status(200).json({ res_status: true, tidx: result.tidx });
    } catch (err) {
      console.error("Error creating OTP:", err);
      res.status(400).json({ res_status: false });
    }
  });

  // api spec #2: 이메일 인증
  route.post("/signUp/otp", async (req, res) => {
    const { tidx, otp } = req.body;
    const isVerified = await authService.verifyOtp(tidx, otp);
    if (isVerified) {
      res.status(200).json({ res_status: true });
    } else {
      res.status(400).json({ res_status: false });
    }
  });

  // api spec #3: 회원가입
  route.post("/signUp/user", async (req, res) => {
    try {
      await authService.signUp(req.body);
      res.status(200).json({ res_status: true });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // api spec #4: 로그인
  route.post("/login", async (req, res) => {
    const { gachon_id, password } = req.body;
    const user = await authService.login(gachon_id, password);
    if (user) {
      res.status(200).json({ res_status: true, uidx: user.uidx });
    } else {
      res.status(400).json({ res_status: false });
    }
  });
};
