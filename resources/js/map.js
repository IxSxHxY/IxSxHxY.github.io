let allMarkers = {};

let map;


// The country the users may checkout,
// We have this object to map the country name to its
// boundaries box.
// So that we can move to that part directly
const locations = {
    China: "24.583095,92.715825,53.597722,135.263672",
    Taiwan: "21.855381,119.605957,25.288411,122.286621",
    Australia: "-40.366641,114.679703,-11.247378,154.933609",
    Japan: "21.855381,119.605957,45.822672,146.900387",
    "South Korea": "37.502753,122.774414,43.382694,131.189941",
    "North Korea": "21.855381,119.605957,45.822672,146.900387",
    Russia: "38.458751,23.765616,77.519324,190.582023",
    "United States of America": "23.789365,-168.644536,72.041421,-63.000004",
    Canada: "48.887836,-142.541025,70.653419,-85.236338",
    Cuba:"19.211579,-85.227540,23.809471,-73.867677",
    Jamaica:"17.675428,-78.508301,18.760713,-75.970459",
    "Cayman Islands":"19.251515,-81.431351,19.407669,-81.059875",
    "Costa Rica": "7.954790,-86.206445,11.276464,-82.713233",
    Panama:"6.629688,-83.018638,10.464045,-76.866294",
    India:"7.641318,65.953122,31.143253,89.419919",
    "Philippines":"5.160977,115.479490,19.128563,128.135740",
    "United Kingdom": "49.530919,-12.779288,59.605547,3.919930",
    Germany:"47.100043,5.238286,54.917040,15.521387", 
    Poland:"49.135721,14.053693,54.810816,24.358868", 
    Afghanistan:"29.431943,59.888671,38.575655,74.786132",
    "New Zealand":"-47.279229,164.970703,-34.161818,179.077148",
    Singapore:"1.205386,103.571411,1.493697,104.112488",
    Indonesia:"-11.953352,93.621093,6.664605,141.301758",
    "Papua New Guinea":"141.033690,-11.135290,153.404295,-1.318246",
    Brunei:"3.961257,113.792541,5.037321,115.462463",
    "Sri Lanka":"141.033690,-11.135290,153.404295,-1.318246",
    Malaysia: "10.303967299859433,94.35644472972965,-3.16418483664057,121.40795771826544",
    World: "-60.239811,189.281280,85.170970,549.984405",
    Madagascar:"-25.728652,42.692871,-11.785626,50.976563",
    Cambodia:"10.238912,101.869629,14.973934,107.97802",
    Vietnam:"8.171411,101.408206,23.780992,110.548831",
    Laos:"13.914190,99.676760,22.661800,108.597658",
    Myanmar:"9.326808,91.300782,28.803963,101.496094",
    Bangladesh:"20.175943,87.301758,26.817218,93.256348",
    Maldives:"-0.611912,72.087890,7.187478,73.999511",
    "Hong Kong":"2.028397,113.699520,22.632754,114.45499",
    Macau:"21.844318,112.991638,22.408867,113.78814",
    Mongolia:"41.126672,87.011719,52.382029,120.234375",
    Sweden:"55.389130,9.990233,69.667369,26.425780",
    Finland:"59.567887,18.715816,70.299908,33.393551",
    Norway:"57.497372,-4.412112,72.353185,31.710934",
    Iceland:"63.162648,-25.101563,66.935487,-12.44531",
    Greenland:"58.066738,-105.714845,84.189325,-5.16797",
    Brazil:"-34.359316,-75.937479,4.481842,-27.59763",
    Peru:"-19.416762,-84.917122,-0.121866,-66.6210",
    Bolivia:"-23.881892,-71.701172,-9.105527,-55.5292",
    Argentina:"-53.932332,-77.238291,-20.450861,-48.410",
    Chile:"-56.693377,-82.019543,-15.544772,-63.035",
    Uruguay:"-36.065073,-59.220703,-29.613113,-51.684",
    Venezuela:"0.201806,-74.074212,12.916558,-58.605462",
    Guyana:"0.581046,-61.665525,8.419769,-55.886717",
    Portugal:"35.842247,-11.616934,43.028415,-4.762419",
    Spain:"35.303562,-10.339283,44.643200,4.775802",
    Tunisia:"29.570517,6.898772,37.960884,12.303294",
    Italy:"36.309757,6.150993,47.157834,20.255476",
    Monaco:"42.737027,4.372401,44.901270,8.151172",
    Switzerland:"45.660756,5.532014,47.814296,10.870626",
    Liechtenstein:"47.021400,9.406268,47.290415,9.724827",
    Hungary:"45.620723,15.901281,48.479965,23.370945",
    Slovakia:"47.661448,16.539625,49.699892,22.778991",
    Ukraine:"42.809269,21.651617,52.962355,42.259102",
    Romania:"43.121213,20.268811,48.478022,29.474073",
    Bulgaria:"40.818021,21.276555,44.657929,29.756820",
    Greece:"40.818021,21.276555,44.657929,29.756820",
    Turkey:"35.360318,25.079772,42.138920,44.632716",
    Syria:"31.503669,33.333722,37.824384,44.186705",
    Lebanon:"32.796428,34.390941,35.021478,37.499640",
    Israel:"29.066907,33.472121,33.827051,36.745592",
    Iraq:"28.139903,37.454164,38.128384,50.548046",
    "Saudi Arabia":"14.740575,33.569329,33.479553,56.857105",
    Yemen:"11.158531,40.129462,20.245450,54.233945",
    Oman:"15.336930,50.631065,25.732958,63.197677",
    "United Arab Emirates":"21.614023,51.215108,26.822914,57.325040",
    Qatar:"24.178244,50.533215,26.383977,51.961239",
    Bahrain:"25.754072,50.300313,26.375971,50.822091",
    Pakistan:"20.694269,58.409558,37.635402,78.193622",
    Nepal:"25.287415,79.444464,31.207684,89.683887",
    Bhutan:"26.499082,88.298695,28.564774,92.805868",
    Kazakhstan:"37.242068,46.545299,56.909132,90.484500",
    Iran:"23.274695,43.031315,41.176979,65.838446",
    Tajikistan:"35.592730,66.188955,40.638288,77.393451",
    Mexico:"11.744544,-119.599603,33.773741,-85.498041",
    France:"41.309046,-7.463143,51.565448,10.916834",
    Ireland:"51.134948,-11.841389,55.664068,-4.985920",
    Kenya:"11.288109,-2.802734,24.553730,17.719727",
    Somalia:"-3.480784,39.062504,12.849734,55.234379",
    Ethiopia:"2.557079,32.690435,15.805896,49.521490",
    Egypt:"20.489066,23.384116,34.003060,40.434897",
    Libya:"18.464279,8.193365,34.226664,29.287115",
    Algeria:"18.771159,-10.616375,37.131621,15.575031",
    Niger:"11.288109,-2.802734,24.553730,17.719727",
    Chad:"6.042880,11.992534,24.284138,25.488281",
    "South Sudan":"2.480493,22.900401,11.675577,36.918956",
    Uganda:"-1.883735,28.916020,4.310483,35.200200",
    Congo:"-12.509816,13.916022,6.542715,32.988288",
    Gabon:"-4.964357,7.856445,2.458227,15.546875",
    "Equatorial Guinea":"0.540637,9.013672,2.660850,11.727295",
    Sudan:"7.139352,21.902234,23.040267,39.756516",
    Eritrea:"12.114745,35.849857,18.680124,43.630745",
    Moldova:"45.098590,26.143986,48.672186,30.758244",
    Belarus:"50.978548,22.552054,56.409185,33.320371",
    Lithuania:"53.747626,20.263671,56.704573,28.085936",
    Latvia:"55.512173,20.532226,58.191105,28.903808",
    Estonia:"57.202163,21.395091,59.873742,28.911399",
    Kyrgyzstan:"38.805569,69.108887,43.582220,80.842285",
    Uzbekistan:"35.557236,55.410157,46.159144,71.054688",
    Turkmenistan:"34.800377,50.908305,42.737831,66.953124",
    Zambia:"-18.684507,20.551759,-7.921008,35.625001",
    Malawi:"-17.257433,31.879883,-8.872241,37.087403",
    Mozambique:"-26.464315,29.350588,-10.301690,42.182620",
    Tanzania:"-12.621183,28.930666,-0.437153,41.938478",
    Rwanda:"-3.163946,28.680420,-0.934447,31.042481",
    Burundi:"-4.666296,28.518067,-2.165118,31.209717",
    "Central African Republic":"1.623766,13.666992,11.050601,28.212891",
    Cameroon:"1.157258,7.836914,7.640949,16.801758",
    Belgium:"49.324279,2.005615,51.713494,7.213135",
    Luxembourg:"49.373869,5.328369,50.281333,6.932373",
    "Czech Republic":"48.306437,11.774903,51.216071,19.487305",
    Denmark:"54.195800,6.113279,58.004746,13.474119",

};

// getter for map
export function getLocations() {
    return locations;
}

// setter for map
export function setMap(newMap) {
    map = newMap;
}

// getter for map
export function getMap() {
    return map;
}

// return API token
function token() {
    return "404ad0e206b09a36793594b36955580f25a87c96";
}

// Create leaflet map 
export function createMap() {

    // Tilelayer to be added onto the map
        //"https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    //-85.458058,-221.484375,85.111416,233.437500
    var southWest = L.latLng(-85.458058,-221.484375),
    northEast = L.latLng(85.111416,233.437500),
    bounds = L.latLngBounds(southWest, northEast);
    var OpenStreetMap_Mapnik = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            minZoom: 0,
            maxBounds: bounds,
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
    );
    // Create map
    let map = L.map(document.getElementById("map"), {
        attributionControl: false,
        gestureHandling: true,
        zoomSnap: 0.1,
        maxBounds: bounds
    })
        .setView([0, 0], 12)
        .addLayer(OpenStreetMap_Mapnik);
        

    // When the move end, update the bound and AQI markers
    setTimeout(function () {
        map.on("moveend", () => {
            let bounds = map.getBounds();
            
            bounds =
                bounds.getNorth() +
                "," +
                bounds.getWest() +
                "," +
                bounds.getSouth() +
                "," +
                bounds.getEast();

            populateMarkers(bounds, true);
        });
    }, 1000);

    return map;
}

// Put the markers on the map
export function populateMarkers(bounds, isRefresh) {
    let count = 0;
    console.log(bounds)
    console.log("Populating")
    return fetch(
        "https://api.waqi.info/v2/map/bounds/?latlng=" +
        bounds +
        "&token=" +
        token()
    )
        .then((x) => x.json())
        .then((stations) => {
            console.log(stations)
            if (stations.status != "ok") throw stations.data;
            // We take only 300 stations, otherwise
            // the website will be extremely laggy
            // when need to fetch a lot of station
            // and put the markers
            stations.data.slice(0, 300).forEach((station) => {
                count ++;
                if (allMarkers[station.uid])
                    map.removeLayer(allMarkers[station.uid]);

                let iw = 50,
                    ih = 70;
                let icon = L.icon({
                    iconUrl:
                        "https://waqi.info/mapicon/" + station.aqi + ".30.png",
                    iconSize: [iw / 2, ih / 2],
                    iconAnchor: [iw / 4, ih / 2 - 5],
                });

                let marker = L.marker([station.lat, station.lon], {
                    zIndexOffset: station.aqi,
                    title: station.station.name,
                    icon: icon,
                }).addTo(map);

                // When marker is clicked,
                // Show the details
                marker.on("click", () => {
                    let popup = L.popup()
                        .setLatLng([station.lat, station.lon])
                        .setContent(station.station.name)
                        .openOn(map);

                    getMarkerPopup(station.uid).then((info) => {
                        popup.setContent(info);
                    });
                });

                allMarkers[station.uid] = marker;
            });
            
            // hide the error showing element
            document.getElementById("leaflet-map-error").style.display = "none";
            return stations.data.map(
                (station) => new L.LatLng(station.lat, station.lon)
            );
        })
        //show the error
        .catch((e) => {
            var o = document.getElementById("leaflet-map-error");
            o.innerHTML = `<p class="text-center">Something wrong happened: <code class="bg-gray-600 text-white px-2">${e}</code>. If the map is failed to fetch, please refresh the page</p>`;
            o.style.display = "";
        });
}


// Put the markers into the map,
// Then, move to that location(bounds)
export function populateAndFitMarkers(bounds) {
    removeMarkers(map);
    if (bounds.split(",").length == 2) {
        let [lat, lng] = bounds.split(",");
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        bounds = `${lat - 0.5},${lng - 0.5},${lat + 0.5},${lng + 0.5}`;
    }
    populateMarkers(bounds).then((markerBounds) => {
        let [lat1, lng1, lat2, lng2] = bounds.split(",");
        let mapBounds = L.latLngBounds(
            L.latLng(lat2, lng2),
            L.latLng(lat1, lng1)
        );
        map.fitBounds(mapBounds, { maxZoom: 12, paddingTopLeft: [0, 40] });
    });
}

// Remove markers
function removeMarkers(map) {
    Object.values(allMarkers).forEach((marker) => map.removeLayer(marker));
    allMarkers = {};
}


// Popup when the marker is clicked
function getMarkerPopup(markerUID) {
    return getMarkerAQI(markerUID).then((marker) => {
        let info =
            marker.city.name +
            ": AQI " +
            marker.aqi +
            " updated on " +
            new Date(marker.time.v * 1000).toLocaleTimeString() +
            "<br>";

        if (marker.city.location) {
            info += "<b>Location</b>: ";
            info += "<small>" + marker.city.location + "</small><br>";
        }
        let pollutants = ["pm25", "pm10", "o3", "no2", "so2", "co"];
        info += "<b>Pollutants</b>: ";
        for (let specie in marker.iaqi) {
            if (pollutants.indexOf(specie) >= 0)
                info += "<u>" + specie + "</u>:" + marker.iaqi[specie].v + " ";
        }
        info += "<br>";
        info += "<b>Weather</b>: ";
        for (let specie in marker.iaqi) {
            if (pollutants.indexOf(specie) < 0)
                info += "<u>" + specie + "</u>:" + marker.iaqi[specie].v + " ";
        }
        info += "<br>";

        info += "<b>Attributions</b>: <small>";
        info += marker.attributions
            .map(
                (attribution) =>
                    "<a target=_ href='" +
                    attribution.url +
                    "'>" +
                    attribution.name +
                    "</a>"
            )
            .join(" - ");
        return info;
    });
}

function getMarkerAQI(markerUID) {
    return fetch(
        "https://api.waqi.info/feed/@" + markerUID + "/?token=" + token()
    )
        .then((x) => x.json())
        .then((data) => {
            if (data.status != "ok") throw data.reason;
            return data.data;
        });
}

// Initialize map and move the starting
// location to Malaysia
export function initMap() {
    
    //[lat1, lng1, lat2, lng2]
    populateAndFitMarkers(locations['Malaysia']);
    /*const locations = {
        Beijing: "39.379436,116.091230,40.235643,116.784382",
        China: "73.6753792663,18.197700914,135.026311477,53.4588044297",
        Taiwan: "114.3593155,10.3730093,122.297,26.4372222",
        Australia: "-40.366641,114.679703,-11.247378,154.933609",
        Bucharest:
            "44.50858895332098,25.936583232631918,44.389144165939854,26.300222840009447",
        London: "51.69945358064312,-0.5996591366844406,51.314690280921894,0.3879568209963314",
        Bangalore:
            "13.106898860432123,77.38497433246386,12.825861486200223,77.84571346820603",
        Gdansk: "54.372158,18.638306",
        Paris: "48.864716,2.349014",
        "Los Angeles": "34.052235,-118.243683",
        Seoul: "37.532600,127.024612",
        Jakarta: "-6.200000,106.816666",
        Malaysia: "10.303967299859433,94.35644472972965,-3.16418483664057,121.40795771826544",
    };

    let oldButton;
    function addLocationButton(location, bounds) {
        let button = document.createElement("button");
        button.classList.add("ui", "button", "tiny");
        document.getElementById("leaflet-locations").appendChild(button);
        button.innerHTML = location;
        let activate = () => {
            populateAndFitMarkers(map, bounds);
            if (oldButton) oldButton.classList.remove("primary");
            button.classList.add("primary");
            oldButton = button;
        };
        button.onclick = activate;
        return activate;
    }

    Object.keys(locations).forEach((location, idx) => {
        let bounds = locations[location];
        let activate = addLocationButton(location, bounds);
        if (idx == 0) activate();
    });

    fetch("https://api.waqi.info/v2/feed/here/?token=" + token())
        .then((x) => x.json())
        .then((x) => {
            console.log(x.data)
            // addLocationButton(x.data.city.name, x.data.city.geo.join(","));
        });*/
    
}
