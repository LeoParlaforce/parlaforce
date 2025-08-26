import 'dotenv/config';
import crypto from "crypto";

const filename = "strongman_6_semaines.pdf";
const expires = Math.floor(Date.now() / 1000) + 3600; // 1h
const token = crypto
  .createHmac("sha256", process.env.STRIPE_SECRET_KEY!)
  .update(filename + expires)
  .digest("hex");

console.log(`http://localhost:3000/protected_pdfs/${filename}?expires=${expires}&token=${token}`);
