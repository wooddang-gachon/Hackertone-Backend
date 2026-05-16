import pool from "../src/loaders/mysql.js";

async function checkData() {
  try {
    const [users] = await pool.execute(
      "SELECT uidx, gachon_id FROM user LIMIT 3",
    );
    const [donations] = await pool.execute(
      "SELECT didx, title FROM donation LIMIT 3",
    );
    const [accepts] = await pool.execute(
      "SELECT aidx, didx, uidx FROM accept LIMIT 3",
    );
    const [comments] = await pool.execute(
      "SELECT cidx, didx, uidx FROM comment LIMIT 3",
    );

    console.log("USERS:", JSON.stringify(users));
    console.log("DONATIONS:", JSON.stringify(donations));
    console.log("ACCEPTS:", JSON.stringify(accepts));
    console.log("COMMENTS:", JSON.stringify(comments));

    process.exit(0);
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
    process.exit(1);
  }
}

checkData();
