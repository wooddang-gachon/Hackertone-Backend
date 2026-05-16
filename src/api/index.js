import { Router } from "express";
import authRouter from "./routes/auth.js";
import chatroomRouter from "./routes/chatroom.js";
import donationRouter from "./routes/donation.js";
import profileRouter from "./routes/profile.js";
import acceptRouter from "./routes/accept.js";
import commentRouter from "./routes/comment.js";
import rankingRouter from "./routes/ranking.js";

export default () => {
  const app = Router();

  authRouter(app);
  chatroomRouter(app);
  donationRouter(app);
  profileRouter(app);
  acceptRouter(app);
  commentRouter(app);
  rankingRouter(app);

  return app;
};

