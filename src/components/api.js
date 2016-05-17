// Require lodash library
var _ = require('lodash');

// Require dateformat library
var dateFormat = require('dateformat');

//require the icons map script
var icons = require('./icons');

// Current weather root url for the actual data
var currentWeatherRootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=575d6a8a0eda57506aefa0a327af4b19';

// Weather forecast root url for the graph data
var weatherForecastRootUrl = 'http://api.openweathermap.org/data/2.5/forecast?APPID=575d6a8a0eda57506aefa0a327af4b19';

// Weather daily forecast root url fot the min/max temperature values
var weatherForecastDailyRootUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=575d6a8a0eda57506aefa0a327af4b19';

// Convert degree Kelvin to degree Celsius
var kelvinToC = function (kelvin) {
    return kelvin - 273;
}


// Get date from Unix timestamp
var dateFromTimestamp = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return dateFormat(date, "dddd, mmmm d");
}

// Get time from Unix timestamp
var timeFromTimestamp = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return dateFormat(date, "HH:MM");
}


module.exports = function (latitude, longitude) {
    var currentWeatherUrl = `${currentWeatherRootUrl}&lat=${latitude}&lon=${longitude}`;
    var weatherForecastUrl = `${weatherForecastRootUrl}&lat=${latitude}&lon=${longitude}`;
    var weatherForecastDailyUrl = `${weatherForecastDailyRootUrl}&lat=${latitude}&lon=${longitude}`;

    //weather data object
    var weatherData = {};

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((json) => {
            weatherData = {
                actualTemperature: kelvinToC(json.main.temp).toFixed(0),
                date: dateFromTimestamp(json.dt),
                cityName: json.name,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity.toFixed(0),
                pressure: json.main.pressure.toFixed(0),
                weatherDescription: _.toUpper(json.weather[0].description),
                weatherIcon: icons(json.weather[0].icon),
                minTemperature: '',
                maxTemperature: '',
                temperaturesForecast: [],
                temperaturesForecastLabels: []

            }
        });

    fetch(weatherForecastDailyUrl)
        .then((response) => response.json())
        .then((json) => {
            weatherData.maxTemperature = kelvinToC(json.list[0].temp.max).toFixed(1);
            weatherData.minTemperature = kelvinToC(json.list[0].temp.min).toFixed(1);
        });

    return fetch(weatherForecastUrl)
        .then((response) => response.json())
        .then((json) => {
            for (var i = 0; i < 9; i++) {
                weatherData.temperaturesForecast[i] = Number(kelvinToC(json.list[i].main.temp).toFixed(1));
                weatherData.temperaturesForecastLabels[i] = timeFromTimestamp(json.list[i].dt);
            }
            return weatherData;
        });
}
