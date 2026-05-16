import { Router } from "express";
import commentService from "../../services/comment.js";

const route = Router();

export default (app) => {
  app.use("/comment", route);

  // 특정 게시글 댓글 조회
  route.post("/detail", async (req, res) => {
    try {
      const { didx } = req.body;
      const comments = await commentService.getComments(didx);
      res.status(200).json({ res_status: true, comment: comments });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 댓글 작성
  route.post("/write", async (req, res) => {
    try {
      const { uidx, didx, text } = req.body;
      const cidx = await commentService.createComment({ uidx, didx, text });
      res.status(200).json({ res_status: true, cidx });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });

  // 대댓글 작성
  route.post("/writeReply", async (req, res) => {
    try {
      const { uidx, cidx, text } = req.body;
      await commentService.createReply({ uidx, cidx, text });
      res.status(200).json({ res_status: true });
    } catch (err) {
      res.status(400).json({ res_status: false });
    }
  });
};
