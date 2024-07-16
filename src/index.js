/* 
make request
current: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi/today?unitGroup=metric&include=current&key=SZU4SR6MBHHMXKBRVGQXXVJU2&contentType=json

    daily next7: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi/next7days?unitGroup=metric&include=days&key=SZU4SR6MBHHMXKBRVGQXXVJU2&contentType=json
    today: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi/today?unitGroup=metric&include=hours&key=SZU4SR6MBHHMXKBRVGQXXVJU2&contentType=json

get data
process data
print data
*/

async function getData() {
    try {
        let response = await fetch(
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Delhi/today?unitGroup=metric&include=current&key=SZU4SR6MBHHMXKBRVGQXXVJU2&contentType=json",
            { mode: "cors" }
        );
        if (response.status == 200) {
            let jsResponse = await response.json();
            console.log(jsResponse);
        } else {
            alert("Our server can't be reached right now.")
        }
    } catch (error) {
        console.log(error);
        alert("An error occured, please try again later.");
    }
}
getData();

