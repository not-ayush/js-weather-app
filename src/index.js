async function getRawData(location) {
    // make the request and return relevant data when resolved
    try {
        let response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=SZU4SR6MBHHMXKBRVGQXXVJU2&contentType=json`,
            { mode: "cors" }
        );
        if (response.status == 200) {
            let jsResponse = await response.json();
            return formatRawData(jsResponse);
        } else {
            alert("Our server can't be reached right now.");
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
            datetimeEpoch: data.currentConditions["datetimeEpoch"],
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

getRawData(prompt("enter location to get the data at.")).then(console.log);
