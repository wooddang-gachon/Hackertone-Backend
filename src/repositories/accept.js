import pool from "../loaders/mysql.js";

export default {
  async findById(aidx) {
    const [rows] = await pool.execute("SELECT * FROM accept WHERE aidx = ?", [aidx]);
    return rows[0];
  },

  async findByDidx(didx) {
    const [rows] = await pool.execute("SELECT * FROM accept WHERE didx = ?", [didx]);
    return rows;
  },

  async updateUidx(aidx, uidx) {
    await pool.execute("UPDATE accept SET uidx = ?, status = 1 WHERE aidx = ?", [uidx, aidx]);
  },

  async cancelUidx(aidx) {
    await pool.execute("UPDATE accept SET uidx = NULL, status = 0 WHERE aidx = ?", [aidx]);
  },

  async updateStatus(aidx, status) {
    await pool.execute("UPDATE accept SET status = ? WHERE aidx = ?", [status, aidx]);
  },

  async create(accept) {
    const { status, didx, uidx, role, point } = accept;
    const [result] = await pool.execute(
      "INSERT INTO accept (status, didx, uidx, role, point) VALUES (?, ?, ?, ?, ?)",
      [status, didx, uidx, role, point]
    );
    return result.insertId;
  }
};
