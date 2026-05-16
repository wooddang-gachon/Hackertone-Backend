import pool from "../src/loaders/mysql.js";

async function getSamples() {
  try {
    const [users] = await pool.execute(
      "SELECT uidx, gachon_id FROM user ORDER BY uidx DESC LIMIT 1",
    );
    const [donations] = await pool.execute(
      "SELECT didx FROM donation ORDER BY didx DESC LIMIT 1",
    );
    const [accepts] = await pool.execute(
      "SELECT aidx, didx FROM accept ORDER BY aidx DESC LIMIT 1",
    );
    const [comments] = await pool.execute(
      "SELECT cidx, didx FROM comment ORDER BY cidx DESC LIMIT 1",
    );

    console.log(
      "SAMPLES=" +
        JSON.stringify({
          user: users[0] || { uidx: 1, gachon_id: "testuser" },
          donation: donations[0] || { didx: 1 },
          accept: accepts[0] || { aidx: 1, didx: 1 },
          comment: comments[0] || { cidx: 1, didx: 1 },
        }),
    );

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

getSamples();
