import { Router } from "express";
import donationService from "../../services/donation.js";

const route = Router();

export default (app) => {
  app.use("/donation", route);

  // 전체 글 조회
  route.post("/list", async (req, res) => {
    try {
      const donations = await donationService.getDonations();
      res.status(200).json({ res_status: true, donations });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 글 내용 조회
  route.post("/detail", async (req, res) => {
    try {
      const { didx } = req.body;
      const donation = await donationService.getDonationDetail(didx);
      if (donation) {
        res.status(200).json({ res_status: true, ...donation });
      } else {
        res.status(400).json({ res_status: false });
      }
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 글 작성
  route.post("/write", async (req, res) => {
    try {
      const didx = await donationService.createDonation(req.body);
      res.status(200).json({ res_status: true, didx });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 글 상태 변경
  route.post("/statusChange", async (req, res) => {
    try {
      const { didx, status } = req.body;
      await donationService.updateStatus(didx, status);
      res.status(200).json({ res_status: true });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });
};
