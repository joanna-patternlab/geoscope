// GEOCODING ------------------------------------------------
// use for MAP and TIME

export async function fetchGeocoding(city, country) {
  if (!city || !country) {
    throw new Error("Missing city or country");
  }

  const url = new URL("/api/geocoding", window.location.origin);
  url.searchParams.append("city", city);
  url.searchParams.append("country", country);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}

// COUNTRY --------------------------------------------------

export async function fetchCountryData(countryName) {
  if (!countryName) {
    throw new Error("Missing country name");
  }

  const url = new URL("/api/country", window.location.origin);
  url.searchParams.append("name", countryName);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}

// REVERSE GEOCODING ----------------------------------------
// use for LOCATION

export async function fetchReverseGeocoding(lat, lon) {
  if (!lat || !lon) {
    throw new Error("Missing coordinates");
  }

  const url = new URL("/api/reversegeocoding", window.location.origin);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lon", lon);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}


// TIME -----------------------------------------------------

export async function fetchTimeByCoordinates(lat, lon) {
  if (!lat || !lon) {
    throw new Error("Missing coordinates");
  }

  const url = new URL("/api/time", window.location.origin);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lon", lon);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}

