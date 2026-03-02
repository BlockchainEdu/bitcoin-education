export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const mondayRes = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MONDAY_API_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const data = await mondayRes.json();
    return res.status(mondayRes.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
