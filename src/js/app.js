// JavaScript Document

//upBTN

$(".upBtn").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 500);
});



// RESET INPUTS VAL

$(function() {
$("#countryInput").val("");
$("#mapCityInput").val("");
$("#mapCountryInput").val("");
$("#latitudeInput").val("");
$("#longitudeInput").val("");
$("#timeCountryInput").val("");
$("#timeCityInput").val("");
});


//LEAFLET MAP ----------------------------------


import { initMap, showMapLocation } from "./map.js";
import {normalizeCountryInput, populateCountryDatalist} from "./country-utils.js";
import {
  fetchCountryData,
  fetchGeocoding,
  fetchReverseGeocoding,
  fetchTimeByCoordinates
} from "./api.js";

$(function() {
  initMap();
});
populateCountryDatalist("#countryList");

const mapButton = $("#getMap");
const mapHelperText = $("#mapHelperText");

mapButton.on("click", async () => {
  const cityName = $("#mapCityInput").val().trim();
  const rawCountry = $("#mapCountryInput").val().trim();

  mapHelperText.text("");

  if (!cityName || !rawCountry) {
    mapHelperText.text("Please enter city and country.");
    return;
  }

  const countryCode = normalizeCountryInput(rawCountry);

  if (!countryCode) {
    mapHelperText.text("Please enter a valid country name or ISO code.");
    return;
  }

  try {
    mapHelperText.text("Loading...");
    const coordinates = await fetchGeocoding(cityName, countryCode);

    const matchedLocation = coordinates.find(
      (item) => item.country === countryCode
    );

    if (!matchedLocation) {
      mapHelperText.text("Location not found. Try a major city (e.g. Cusco instead of Machu Picchu).");
      return;
    }

    showMapLocation(
      matchedLocation.latitude,
      matchedLocation.longitude,
      `${matchedLocation.name}, ${matchedLocation.country}`
    );

    mapHelperText.empty()
    
  } catch (error) {
    console.error(error);
    mapHelperText.text("Unable to fetch city data.");
  }
});




// SEARCH COUNTRY
import { showCountry, showLocation } from "./ui.js";


let countryDataList = $(`#countryDataList`);
const countryButton = $(`#getCountryButton`);



countryButton.on("click", async () => {
    let countryName = $("#countryInput").val().trim();

    countryDataList.empty();

    if (!countryName) {
        $("<p>")
          .text("Please enter the name of the country")
          .appendTo(countryDataList);
        return;
    }

    try {
        const data = await fetchCountryData(countryName);
        showCountry(data);
    } catch (error) {
        console.error("Country fetch error:", error);

        $("<p>")
          .text("Error fetching country data")
          .appendTo(countryDataList);
    }
});


//LOCATION


const locationButton = $("#getLocationButton");

locationButton.on("click", async () => {
  console.log("LOCATION CLICK WORKS");
  const lat = latitudeInput.val().trim();
  const lon = longitudeInput.val().trim();

  if (!lat || !lon) return;

  try {
    const data = await fetchReverseGeocoding(lat, lon);
    showLocation(data);
  } catch (error) {
    console.error("Location fetch error:", error);
  }
});



//50.25587 18.85599


//TIME--------------------------------------------------------------------------


import { showTime, showError } from "./ui.js";

const timeDataList = $("#timeDataList");
const timeButton = $("#getTimeButton");

timeButton.on("click", async () => {
  const city = $("#timeCityInput").val().trim();
  const country = $("#timeCountryInput").val().trim();

  timeDataList.empty();

  if (!city || !country) {
    showError(timeDataList, "Please enter the correct name of the city.");
    return;
  }

  try {
    const coordinates = await fetchGeocoding(city, country);
    const firstMatch = coordinates[0];

    if (!firstMatch) {
      showError(timeDataList, "City not found.");
      return;
    }

    const timeData = await fetchTimeByCoordinates(
      firstMatch.latitude,
      firstMatch.longitude
    );

    showTime(timeData);
  } catch (error) {
    console.error(error);
    showError(timeDataList, "Unable to fetch time data.");
  }
});


// ANIMATION

import { initScrollAnimations, setAnimationDelay, prepareLogoPaths } from "./animations.js";


initScrollAnimations();
prepareLogoPaths();
setAnimationDelay(0.3);








