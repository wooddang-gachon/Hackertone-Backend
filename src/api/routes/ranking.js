import { Router } from "express";
import rankingService from "../../services/ranking.js";

const route = Router();

export default (app) => {
  app.use("/rankings", route);

  route.post("/:category", async (req, res) => {
    const { category } = req.params;
    const { uidx, limit } = req.body;

    try {
      const data = await rankingService.getRankings(category, uidx, limit);
      res.status(200).json({
        res_status: true,
        data
      });
    } catch (err) {
      console.error(`Error fetching rankings for ${category}:`, err);
      if (err.message === "INVALID_CATEGORY") {
        return res.status(400).json({ res_status: false, message: "Invalid category" });
      }
      res.status(500).json({ res_status: false });
    }
  });
};
