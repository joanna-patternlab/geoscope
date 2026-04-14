export default async function handler(req, res) {
  try {
    const { city, country } = req.query;

    if (!city || !country) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const url = new URL("https://api.api-ninjas.com/v1/geocoding");
    url.searchParams.append("city", city);
    url.searchParams.append("country", country);

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