import Logger from "../../config/logger.js";

const apiLogger = (req, res, next) => {
  const { method, url, body } = req;
  const start = Date.now();

  // 응답이 끝날 때 로그 기록
  const originalJson = res.json;
  res.json = function (data) {
    const duration = Date.now() - start;
    Logger.info(`[API] ${method} ${url} | Status: ${res.statusCode} | Duration: ${duration}ms`, {
      requestBody: body,
      responseBody: data,
    });
    return originalJson.call(this, data);
  };

  next();
};

export default apiLogger;
