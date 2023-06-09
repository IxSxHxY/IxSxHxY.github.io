const randomizeEl = document.getElementById("randomize")
const feedEl = document.getElementById("mutiple-city-aqi")
const errorEl = document.getElementById("error")

// Its me! Token
function token() {
    return "404ad0e206b09a36793594b36955580f25a87c96";
}



// Self defined function to add the widget from the API
(function (w, d, t, f) {
    w[f] = w[f] || function (c, k, n) {
        s = w[f], k = s['k'] = (s['k'] || (k ? ('&k=' + k) : '')); s['c'] =
            c = (c instanceof Array) ? c : [c]; s['n'] = n = n || 0; L = d.createElement(t), e = d.getElementsByTagName(t)[0];
        try {
            L.async = 1; L.src = '//feed.aqicn.org/feed/' + (c[n].city) + '/' + (c[n].lang || '') + '/feed.v1.js?n=' + n + k;
            e.parentNode.insertBefore(L, e);
        }catch(err) {
            errorEl.innerText = "Cannot load this";
        }
        
        
    };
})(window, document, 'script', '_aqiFeed');




let content = '';
let count = 0;
var cities = ["ipoh", "kota-bharu", "johor-bahru","beijing", "seoul", "guangzhou", "tokyo", "shanghai", "paris", "hongkong","kuala-lumpur"];
var aqiWidgetConfig = [];


// Put the widget into content
function displayCity(aqi) {
    console.log(aqi.details)
    content += `<div class="inline-flex p-2">${aqi.details}</div>`//.text("<center>%cityname<br>%aqi<br><small>%date</small></center>");
    count += 1
    // Show all at once when all 10 widget is added
    if (count == 10) {
        feedEl.innerHTML = content
        content = '';
        count = 0;
        }
}  


// Randomly choose 10 widgets and show them
function getRandomFeed() {
    feedEl.innerHTML = `<div class="lds-dual-ring mx-auto"></div>`;
    //feedEl.innerHTML += `<p class="text-center mb-2">Loading ... (I set this delay for you to see the animation)<p>`
    const shuffled = [...cities].sort(() => 0.5 - Math.random()).slice(0, 10);

    shuffled.forEach(function (city) { 
        aqiWidgetConfig.push({ city: city, display:"%details", lang: "en", callback: displayCity }); 
    });
    
    _aqiFeed(aqiWidgetConfig);
}

getRandomFeed();

// When button is pressed, randomize the widget
randomizeEl.addEventListener('click', function() {
    aqiWidgetConfig = [];
    getRandomFeed();
})