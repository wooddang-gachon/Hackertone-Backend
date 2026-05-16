import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT,

  /**
   * That long string from mlab
   */












    
  databaseHOST: process.env.mysql2_HOST,
  databasePORT: process.env.mysql2_PORT,
  databaseUSER: process.env.mysql2_USER,
  databasePASSWORD: process.env.mysql2_PASSWORD,
  databaseNAME: process.env.mysql2_DATABASE,

  resendApiKey: process.env.RESEND_API_KEY,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  /**
   * API configs
   */
  api: {
    prefix: process.env.API_PREFIX || "/",
  },
};
