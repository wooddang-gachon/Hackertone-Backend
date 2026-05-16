import pool from "../loaders/mysql.js";

export default {
  async findById(uidx) {
    const [rows] = await pool.execute("SELECT * FROM user WHERE uidx = ?", [uidx]);
    return rows[0];
  },

  async findByGachonId(gachon_id) {
    const [rows] = await pool.execute("SELECT * FROM user WHERE gachon_id = ?", [gachon_id]);
    return rows[0];
  },

  async create(user) {
    const { gachon_id, name, password } = user;
    const [result] = await pool.execute(
      "INSERT INTO user (gachon_id, name, password, point, exercise, study, music, game, clean) VALUES (?, ?, ?, 100, 0, 0, 0, 0, 0)",
      [gachon_id, name, password]
    );
    return result.insertId;
  },

  async updatePoints(uidx, point) {
    await pool.execute("UPDATE user SET point = point + ? WHERE uidx = ?", [point, uidx]);
  },

  async updateTags(uidx, tags) {
    const { exercise = 0, study = 0, music = 0, game = 0, clean = 0 } = tags;
    await pool.execute(
      "UPDATE user SET exercise = exercise + ?, study = study + ?, music = music + ?, game = game + ?, clean = clean + ? WHERE uidx = ?",
      [exercise, study, music, game, clean, uidx]
    );
  }
};
