import { Router } from "express";
import profileService from "../../services/profile.js";

const route = Router();

export default (app) => {
  app.use("/profile", route);

  // api spec #6: 현재 포인트 조회
  route.post("/point", async (req, res) => {
    const { uidx } = req.body;
    const point = await profileService.getPoint(uidx);
    if (point !== null) {
      res.status(200).json({ res_status: true, point });
    } else {
      res.status(400).json({ res_status: false });
    }
  });

  // api spec #7: 전문가 타이틀 조회
  route.post("/tag", async (req, res) => {
    const { uidx } = req.body;
    const tags = await profileService.getTags(uidx);
    if (tags) {
      res.status(200).json({ res_status: true, ...tags });
    } else {
      res.status(400).json({ res_status: false });
    }
  });
};
