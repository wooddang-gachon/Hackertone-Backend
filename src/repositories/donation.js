import pool from "../loaders/mysql.js";

export default {
  async create(donation) {
    const { status, writerIdx, title, text, duedate, exercise, study, music, game, clean } = donation;
    const [result] = await pool.execute(
      "INSERT INTO donation (status, writerIdx, title, text, duedate, exercise, study, music, game, clean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [status, writerIdx, title, text, duedate, exercise, study, music, game, clean]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.execute("SELECT * FROM donation ORDER BY didx DESC");
    return rows;
  },

  async findById(didx) {
    const [rows] = await pool.execute("SELECT * FROM donation WHERE didx = ?", [didx]);
    return rows[0];
  },

  async updateStatus(didx, status) {
    await pool.execute("UPDATE donation SET status = ? WHERE didx = ?", [status, didx]);
  }
};
