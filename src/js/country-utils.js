import { countries } from "./countries.js";

export function normalizeCountryInput(countryInput) {
  if (!countryInput || !countryInput.trim()) {
    return null;
  }

  const value = countryInput.trim().toLowerCase();

  const matchedCountry = countries.find((country) => {
    const countryName = country.name.toLowerCase();
    const code2 = country.code2.toLowerCase();
    const code3 = country.code3.toLowerCase();
    const aliases = (country.aliases || []).map((alias) =>
      alias.toLowerCase()
    );

    return (
      value === countryName ||
      value === code2 ||
      value === code3 ||
      aliases.includes(value)
    );
  });

  return matchedCountry ? matchedCountry.code2 : null;
}

export function getCountryNameByCode(code) {
  if (!code) return null;

  const value = code.trim().toLowerCase();

  const matchedCountry = countries.find(
    (country) => country.code2.toLowerCase() === value
  );

  return matchedCountry ? matchedCountry.name : null;
}



export function populateCountryDatalist(datalistSelector) {
  const $datalist = $(datalistSelector);

  $datalist.empty();

  countries.forEach((country) => {
    $("<option>")
      .attr("value", country.name)
      .appendTo($datalist);
  });
}