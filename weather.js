const weatherTemp = document.querySelector(".js-Temp");
const weatherPlace = document.querySelector(".js-place");
const weatherIcon = document.querySelector(".icon");

const API_KEY = "baaf3edcd5a35500c153f8a7fe61f91c";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const icon = json.weather[0].icon;
        weatherTemp.innerText = `${temperature}ºC`;
        weatherPlace.innerText = `${place}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can not access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords(); 
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);        
    }
}

function init() {
    loadCoords();
}

init();
