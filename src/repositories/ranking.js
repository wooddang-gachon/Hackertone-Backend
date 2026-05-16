import pool from "../loaders/mysql.js";

export default {
  async getTopRankings(category, limit = 10) {
    // category는 이미 service에서 검증됨
    const query = `
      SELECT name as nickname, ?? as score
      FROM user
      ORDER BY ?? DESC
      LIMIT ?
    `;
    const [rows] = await pool.query(query, [category, category, limit]);
    
    // 순위 추가
    return rows.map((row, index) => ({
      rank: index + 1,
      ...row
    }));
  },

  async getUserRank(uidx, category) {
    const query = `
      SELECT sub.rank, sub.score
      FROM (
        SELECT uidx, ?? as score,
               RANK() OVER (ORDER BY ?? DESC) as \`rank\`
        FROM user
      ) sub
      WHERE sub.uidx = ?
    `;
    const [rows] = await pool.query(query, [category, category, uidx]);
    return rows[0];
  }
};
