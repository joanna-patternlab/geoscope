


// COUNTRY
const countryDataList = $(`#countryDataList`);

export function showCountry(result) {
    countryDataList.empty();

    if (!result?.length) {
        $("<p>").text("Please enter the correct name of the country.").appendTo(countryDataList);
        return;
    }

    result.forEach((item) => {
        [
            ["Name", item.name],
            ["Short code", item.iso2],
            ["Region", item.region],
            ["Capital", item.capital],
            ["Surface area", item.surface_area],
            ["Population", item.population],
            ["Currency", formatCurrency(item.currency)]
        ].forEach(([label, value]) => {
           $("<p>").append($("<span>").addClass("pLabel").text(`${label}: `)).append($("<strong>").text(value ?? "N/A")) .appendTo(countryDataList);
        });
    });
}

export function formatCurrency(currency) {
    if (!currency || typeof currency !== "object") return "N/A";

    return Object.entries(currency)
        .map(([code, name]) => `${code}: ${name}`)
        .join(" | ");
}


//LOCATION

const locationDataList = $(`#locationDataList`);

export function showLocation(result) {
    locationDataList.empty();

    if (!result?.length) {
        $("<p>").text("Please write the correct data.").appendTo(locationDataList);
        return;
    }
      result.forEach((item) => {
        [
            ["Name of city", item.name],
            ["Country code", item.country],
            ["State", item.state],
          
        ].forEach(([label, value]) => {
           $("<p>").append($("<span>").addClass("pLabel").text(`${label}: `)).append($("<strong>").text(value ?? "N/A")) .appendTo(locationDataList);
        });
    });
}




// TIME

const timeDataList = $("#timeDataList");

export function showError(container, message) {
    container.empty();
    $("<p>").text(message).appendTo(container);
}

export function showTime(result) {
    timeDataList.empty();

    if (!result || typeof result !== "object" || Object.keys(result).length === 0) {
        showError(timeDataList, "Time data not available.");
        return;
    }

    const rows = [
        ["Time zone", result.timezone],
        ["Date", result.date],
        ["Time", result.time],
        ["Day", result.day_of_week]
    ];

    rows.forEach(([label, value]) => {
        $("<p>")
            .text(`${label}: `)
            .append($("<strong>").text(value ?? "N/A"))
            .appendTo(timeDataList);
    });
}