export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon" });
  }

  try {
    const url = new URL("https://timeapi.io/api/v1/time/current/coordinate");
    url.searchParams.append("latitude", lat);
    url.searchParams.append("longitude", lon);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Upstream time API error",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("time proxy error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}