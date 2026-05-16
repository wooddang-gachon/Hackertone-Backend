import pool from "./src/loaders/mysql.js";

async function findPending() {
  try {
    const [rows] = await pool.execute("SELECT aidx, uidx, status FROM accept WHERE status = 1 LIMIT 5");
    console.log("PENDING_ACCEPTS=" + JSON.stringify(rows));
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}

findPending();
