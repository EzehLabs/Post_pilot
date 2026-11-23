export default function health(_req, res) {
  return res.status(200).json({ status: "ok", service: "postpilot-api" });
}
