import pool from "./src/loaders/mysql.js";

async function debugApproval() {
  const aidx = 6;
  try {
    const [accepts] = await pool.execute("SELECT * FROM accept WHERE aidx = ?", [aidx]);
    const accept = accepts[0];
    
    if (!accept) {
      console.log("DEBUG: Accept record not found");
    } else {
      console.log("DEBUG: Accept Record =", JSON.stringify(accept));
      const [donations] = await pool.execute("SELECT * FROM donation WHERE didx = ?", [accept.didx]);
      const donation = donations[0];
      if (!donation) {
        console.log("DEBUG: Donation record not found for didx =", accept.didx);
      } else {
        console.log("DEBUG: Donation Record =", JSON.stringify(donation));
        
        const [writers] = await pool.execute("SELECT uidx, point FROM user WHERE uidx = ?", [donation.writeridx]);
        console.log("DEBUG: Writer User =", JSON.stringify(writers[0]));
        
        const [applicants] = await pool.execute("SELECT uidx, point FROM user WHERE uidx = ?", [accept.uidx]);
        console.log("DEBUG: Applicant User =", JSON.stringify(applicants[0]));
      }
    }
    process.exit(0);
  } catch (err) {
    console.error("DEBUG ERROR:", err.message);
    process.exit(1);
  }
}

debugApproval();
