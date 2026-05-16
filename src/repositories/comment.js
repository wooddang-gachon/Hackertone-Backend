import pool from "../loaders/mysql.js";

export default {
  async create(comment) {
    const { parent_cidx, didx, uidx, text } = comment;
    const [result] = await pool.execute(
      "INSERT INTO comment (parent_cidx, didx, uidx, text) VALUES (?, ?, ?, ?)",
      [parent_cidx || null, didx, uidx, text]
    );
    return result.insertId;
  },

  async findByDidx(didx) {
    const [rows] = await pool.execute("SELECT * FROM comment WHERE didx = ?", [didx]);
    return rows;
  }
};
