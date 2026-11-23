import pool from "./db.js";

export default async function handleLead(req, res) {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO leads (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET updated_at = NOW() RETURNING id",
      [email]
    );
    return res.status(201).json({ message: "You're on the list. We'll be in touch!", id: result.rows[0].id });
  } catch (error) {
    console.error("Could not save lead:", error.message);
    return res.status(503).json({ error: "We couldn't save your request right now. Please try again shortly." });
  }
}
