import expressLoader from "./express.js";
import sqlLoader from "./mysql.js";
import Logger from "../config/logger.js";

export default async ({ expressApp }) => {
  // express 설정
  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");

  await sqlLoader;
  Logger.info("✌️ DB loaded");
};
