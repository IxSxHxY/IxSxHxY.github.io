const searchFormEl = document.getElementById('searchForm');
const searchStationInputEl = document.getElementById('searchStationInput');
const searchResultEl = document.getElementById('searchResult');
const stationInfoEl = document.getElementById('stationInfo');

let timeout;

// Colorize the div
function colorize(aqi, specie) {
    specie = specie || "aqi";
    if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
        return aqi;

    var spectrum = [
        { a: 0, b: "#cccccc", f: "#ffffff" },
        { a: 50, b: "#009966", f: "#ffffff" },
        { a: 100, b: "#ffde33", f: "#000000" },
        { a: 150, b: "#ff9933", f: "#000000" },
        { a: 200, b: "#cc0033", f: "#ffffff" },
        { a: 300, b: "#660099", f: "#ffffff" },
        { a: 500, b: "#7e0023", f: "#ffffff" },
    ];

    var i = 0;
    for (i = 0; i < spectrum.length - 2; i++) {
        if (aqi == "-" || aqi <= spectrum[i].a) break;
    }
    let res = `<div style="min-width:20px; text-align:center; background-color:${spectrum[i].b}; color:${spectrum[i].f}">
    ${aqi}
    </div>
    
    `
    return res;
}

// Return token get from the waqi
// Dont use this for bad purpose!!!!!
function token() {
    return "404ad0e206b09a36793594b36955580f25a87c96";
}


// Show specific station's information 
function showStation(station) {

    // Add loading animation before the details is fetch
    // 1 second lag is put because user does not believe
    // fast website
    stationInfoEl.innerHTML = '';
    stationInfoEl.innerHTML += `<div class="lds-dual-ring mx-auto"></div>`;
    stationInfoEl.innerHTML += `<p class="text-center mb-2">Loading ... (I set this delay for you to see the animation)<p>`

    // Fetch the details after 1 second
    setTimeout(() => {
        let url =
            "https://api.waqi.info/feed/@" + station.uid + "/?token=" + token();


        fetch(url)
            .then((x) => x.json())
            .then((result) => {

                // If cannot find any data or something's wrong
                if (!result || result.status != "ok") {
                    stationInfoEl.innerHTML = `<h2 class="text-center">Sorry, something wrong happend</h2> <p class="text-center">${e}</p>`;
                    stationInfoEl.innerHTMl = " ";
                    if (result.data) stationInfoEl.innerHTML += `<code>${result.data}</code>`;
                    return;
                }
                    
                // Map abbreviation to its full name
                var names = {
                    pm25: "PM<sub>2.5</sub>",
                    pm10: "PM<sub>10</sub>",
                    o3: "Ozone",
                    no2: "Nitrogen Dioxide",
                    so2: "Sulphur Dioxide",
                    co: "Carbon Monoxyde",
                    aqi: "AQI",
                    t: "Temperature",
                    w: "Wind",
                    r: "Rain (precipitation)",
                    h: "Relative Humidity",
                    d: "Dew",
                    p: "Atmostpheric Pressure",
                };

                // Add station name and last updated time into div
                stationInfoEl.innerHTML = `
                <p class="max-w-[500px]">
                Station: ${result.data.city.name} 
                </p>
                ${result.data.time.s == undefined?"":`<p class="max-w-[500px]">Updated on: ${result.data.time.s}</p>`}
                `

                // Create a table to put other information
                let table = document.createElement("table");
                table.setAttribute("class", "border border-gray-200 mb-3")

                for (var specie in result.data.iaqi) {
                    var aqi = result.data.iaqi[specie].v;
                    table.innerHTML += `
                <tr >
                <td class="p-1"> ${names[specie] || specie} </td>
                <td class="text-center p-1"> ${colorize(aqi, specie)} </td>
                </tr>
                `

                }

                // Put the table into the division
                stationInfoEl.appendChild(table);
            })
            .catch((e) => {
                // If error happened, it will be displayed here.
                stationInfoEl.innerHTML = `<h2 class="text-center">Sorry, something wrong happened: </h2> <p class="text-center">${e}</p>`;
            });
    }, 1000);
}

function getStations(keyword) {
    let url = `https://api.waqi.info/v2/search/?token=${token()}&keyword=${keyword}`;
    fetch(url).then(
        response => response.json()
    ).then(
        result => {

            if (!result || result.status != "ok") {
                throw result.data;
            }

            searchResultEl.innerHTML = '';


            // If cannot find any station, then show "Cannot find your query"
            if (result.data.length == 0) {
                let res = document.createElement('h1')
                res.setAttribute("class", "text-lg text-whie text-center")
                res.innerHTML = "Sorry, there is no result for your query!"
                searchResultEl.appendChild(res);
                return;
            }

            // Add the found result into table
            let table = document.createElement('table')

            table.setAttribute('class', 'table-fixed inline-block text-center text-sm w-full h-[250px] md:h-[400px] lg:h-[450px] overflow-y-auto rounded-scrollbar')

            let tableHead = document.createElement("thead");
            tableHead.setAttribute("class", "sticky bg-gray-300 text-black table top-0 w-full border")
            tableHead.innerHTML += ` 
            <tr>
                <th class="border border-black w-2/5">Station's name</th>
                <th class="border border-black w-1/5">AQI</th>
                <th class="border border-black w-2/5">Last updated time</th>
            </tr>
            `
            table.appendChild(tableHead)

            let tableBody = document.createElement("tbody");
            tableBody.setAttribute('class', "border table w-full");

            result.data.forEach((station, i) => {
                let row = document.createElement('tr')
                row.setAttribute('class', 'hover:bg-gray-200 hover:text-black active:bg-black active:text-white cursor-pointer')
                row.innerHTML += `
                <td class="border border-black w-2/5 break-all p-1">${station.station.name}</td>
                <td class="border border-black w-1/5">${colorize(station.aqi)}</td>
                <td class="border border-black w-2/5 p-1">${station.time.stime}</td>
                `
                // When the row is clicked, show that station
                row.addEventListener('click', function () {
                    showStation(station);
                }
                )
                tableBody.appendChild(row)


                // Show the first station
                if (i == 0) showStation(station);
            })

            table.appendChild(tableBody)
            searchResultEl.appendChild(table);
        }
    ).catch((e) => {
        // Error message
        searchResultEl.innerHTML = `<p>Something wrong happened:</p> <p>${e}</p> <p>If the fetching is failed, simply refresh the page</>`;
    });
}


searchStationInputEl.addEventListener('keyup', function () {
    if (this.value !== "")
        getStations(this.value);
})

searchFormEl.onsubmit = function (e) {
    e.preventDefault();
    return false;
}

getStations("Malaysia")