import pool from "../src/loaders/mysql.js";

async function describeTables() {
  try {
    const tables = ["user", "donation", "accept", "comment"];
    for (const table of tables) {
      try {
        const [rows] = await pool.execute(`DESCRIBE ${table}`);
        console.log(`--- ${table} ---`);
        console.table(rows);
      } catch (e) {
        console.log(`Table ${table} not found or error: ${e.message}`);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error("Critical error:", err.message);
    process.exit(1);
  }
}

describeTables();
