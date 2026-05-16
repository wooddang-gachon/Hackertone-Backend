import { Router } from "express";
import donationService from "../../services/donation.js";

const route = Router();

export default (app) => {
  app.use("/donation", route);

  route.post("/", async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0 || (req.body.uidx && Object.keys(req.body).length === 1)) {
        // uidx만 있거나 빈 body인 경우 조회로 처리 (전례 참고)
        const donations = await donationService.getDonations();
        return res.status(200).json(donations);
      }
      const didx = await donationService.createDonation(req.body);
      res.status(200).json({ res_status: true, didx });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });
};
