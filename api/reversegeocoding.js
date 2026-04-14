export default async function handler(req, res) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Missing coordinates" });
    }

    const url = new URL("https://api.api-ninjas.com/v1/reversegeocoding");
    url.searchParams.append("lat", lat);
    url.searchParams.append("lon", lon);

    const response = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY,
      },
    });

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