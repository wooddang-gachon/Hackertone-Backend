import express from "express";
import cors from "cors";
import config from "../config/index.js";
import routes from "../api/index.js";
import Logger from "../config/logger.js";
import apiLogger from "../api/middlewares/logger.js";

export default ({ app }) => {
  app.use(cors());
  app.use(express.json());

  // API 로깅 미들웨어 등록
  app.use(apiLogger);

  // API 라우트 설정
  app.use(config.api.prefix, routes());

  Logger.info("✌️ API loaded");
};
