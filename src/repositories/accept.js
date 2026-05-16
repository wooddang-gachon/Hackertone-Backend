import pool from "../loaders/mysql.js";

export default {
  async create(accept) {
    const { status, didx, role, point } = accept;
    const [result] = await pool.execute(
      "INSERT INTO accept (status, didx, role, point) VALUES (?, ?, ?, ?)",
      [status, didx, role, point]
    );
    return result.insertId;
  },

  async findByDidx(didx) {
    const [rows] = await pool.execute("SELECT * FROM accept WHERE didx = ?", [didx]);
    return rows;
  }
};
