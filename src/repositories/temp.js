import pool from "../loaders/mysql.js";

export default {
  async create(gachon_id, otp) {
    await this.deleteByGachonId(gachon_id);
    const [result] = await pool.execute(
      "INSERT INTO temp (gachon_id, otp) VALUES (?, ?)",
      [gachon_id, otp]
    );
    return result.insertId;
  },

  async findById(tidx) {
    const [rows] = await pool.execute("SELECT * FROM temp WHERE tidx = ?", [tidx]);
    return rows[0];
  },

  async delete(tidx) {
    await pool.execute("DELETE FROM temp WHERE tidx = ?", [tidx]);
  },

  async deleteByGachonId(gachon_id) {
    await pool.execute("DELETE FROM temp WHERE gachon_id = ?", [gachon_id]);
  }
};
