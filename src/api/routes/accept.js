import { Router } from "express";
import acceptService from "../../services/accept.js";

const route = Router();

export default (app) => {
  app.use("/accept", route);

  // 역할 조회
  route.post("/detail", async (req, res) => {
    try {
      const { didx } = req.body;
      const accept = await acceptService.getAcceptDetails(didx);
      res.status(200).json({ res_status: true, accept });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 역할 신청
  route.post("/subscribe", async (req, res) => {
    try {
      const { uidx, aidx } = req.body;
      const success = await acceptService.subscribeRole(aidx, uidx);
      if (success) {
        res.status(200).json({ res_status: true });
      } else {
        res.status(400).json({ res_status: false });
      }
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 역할 신청 취소
  route.post("/subscribeCancel", async (req, res) => {
    try {
      const { aidx } = req.body;
      const success = await acceptService.cancelRole(aidx);
      if (success) {
        res.status(200).json({ res_status: true });
      } else {
        res.status(400).json({ res_status: false });
      }
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 역할 포인트 지급
  route.post("/approval", async (req, res) => {
    try {
      const { aidx } = req.body;
      const success = await acceptService.approveRole(aidx);
      if (success) {
        res.status(200).json({ res_status: true });
      } else {
        res.status(400).json({ res_status: false });
      }
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 역할 포인트 지급 거절
  route.post("/refusal", async (req, res) => {
    try {
      const { aidx } = req.body;
      const success = await acceptService.refuseRole(aidx);
      if (success) {
        res.status(200).json({ res_status: true });
      } else {
        res.status(400).json({ res_status: false });
      }
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });
};
