require("dotenv").config({ path: "../backend/.env" });

const dns = require("dns");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hash = await bcrypt.hash("dell25590", 10);

    const result = await mongoose.connection.db
      .collection("admins")
      .updateOne(
        { email: "admin@codesminds.com" },
        { $set: { password: hash } }
      );

    console.log("Matched:", result.matchedCount);
    console.log("Modified:", result.modifiedCount);
    console.log("ADMIN PASSWORD UPDATED SUCCESSFULLY");

    await mongoose.disconnect();
  } catch (error) {
    console.error("ERROR:", error.message);
    process.exit(1);
  }
}

resetPassword();