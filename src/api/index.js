import { Router } from "express";
import authRouter from "./routes/auth.js";
import chatroomRouter from "./routes/chatroom.js";
import donationRouter from "./routes/donation.js";
import profileRouter from "./routes/profile.js";

export default () => {
  const app = Router();

  authRouter(app);
  chatroomRouter(app);
  donationRouter(app);
  profileRouter(app);

  return app;
};
