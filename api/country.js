
export default async function handler(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Missing country name" });
    }

    const response = await fetch(
      `https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(name)}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Upstream API error: ${response.status}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}