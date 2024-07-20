import "./styles.css";

async function getRawData(location) {
    // make the request and return relevant data when resolved
    try {
        let key = "SZU4SR6MBHHMX" + "KBRVGQXXVJU2";
        let response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=${key}&contentType=json`,
            { mode: "cors" }
        );
        if (response.status == 200) {
            let jsResponse = await response.json();
            return formatRawData(jsResponse);
        } else {
            alert("That location can't be found.");
        }
    } catch (error) {
        console.log(error);
        alert("An error occured, please try again later.");
    }
}

function formatRawData(data) {
    // returns the releveant data as {today: {}, current: {}}
    return {
        address: data.resolvedAddress,
        current: {
            datetime: data.currentConditions["datetime"],
            temp: data.currentConditions["temp"],
            feelslike: data.currentConditions["feelslike"],
            humidity: data.currentConditions["humidity"],
            dew: data.currentConditions["dew"],
            precipprob: data.currentConditions["precipprob"],
        },
        today: {
            datetime: data.days[0]["datetime"],
            tempmax: data.days[0]["tempmax"],
            tempmin: data.days[0]["tempmin"],
            temp: data.days[0]["temp"],
            feelslike: data.days[0]["feelslike"],
            dew: data.days[0]["dew"],
            humidity: data.days[0]["humidity"],
            precipprob: data.days[0]["precipprob"],
        },
    };
}

const searchBtn = document.querySelector("#search");
const inputElem = document.querySelector("#location-input");
const address = document.querySelector(".selected-address");
const current = document.querySelector(".current");
const today = document.querySelector(".today");
const form = document.querySelector(".search-form");
const loadingBanner = document.querySelector(".loading-banner");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputElem.value != "") {
        loadingBanner.classList.toggle("currently-loading");
        getRawData(inputElem.value)
            .then(updateDom)
            .finally(() => {
                form.reset();
                loadingBanner.classList.toggle("currently-loading");
            });
    }
});

function updateDom(dataObj) {
    if (!dataObj) return;
    address.textContent = dataObj.address;
    updateWeatherInfo(current, dataObj);
    updateWeatherInfo(today, dataObj);
}

function updateWeatherInfo(infoElem, dataObj) {
    for (let curNode of infoElem.children) {
        if (curNode.nodeName != "DIV") {
            continue;
        }
        let dataElem = curNode.firstElementChild;
        let dataId = dataElem.getAttribute("id");
        if (infoElem.classList.contains("current")) {
            dataElem.textContent = dataObj.current[dataId];
        } else {
            dataElem.textContent = dataObj.today[dataId];
        }
    }
}

