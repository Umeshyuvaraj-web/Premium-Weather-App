const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

const loading = document.getElementById("loading");
const weatherContent = document.getElementById("weatherContent");
const errorMessage = document.getElementById("errorMessage");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const recentSearches =
    document.getElementById("recentSearches");


/* =========================
   INITIALIZATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayDate();

        loadTheme();

        renderRecentSearches();

        const savedCity =
            localStorage.getItem(
                "skycast_last_city"
            );

        if (savedCity) {

            cityInput.value = savedCity;

            searchCity(savedCity);

        } else {

            searchCity("Bengaluru");

        }

    }
);


/* =========================
   SEARCH
========================= */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const city =
            cityInput.value.trim();

        if (!city) {

            showError(
                "Please enter a city name."
            );

            return;

        }

        searchCity(city);

    }
);


/* =========================
   SEARCH CITY
========================= */

async function searchCity(city) {

    hideError();

    showLoading();

    try {

        const location =
            await getCoordinates(city);

        if (!location) {

            throw new Error(
                "City not found."
            );

        }

        const weather =
            await getWeather(
                location.latitude,
                location.longitude
            );

        displayWeather(
            location,
            weather
        );

        saveRecentSearch(
            location.name
        );

        localStorage.setItem(
            "skycast_last_city",
            location.name
        );

    } catch (error) {

        console.error(error);

        showError(
            "Unable to find weather for this city. Please check the city name and try again."
        );

    } finally {

        hideLoading();

    }

}


/* =========================
   GET COORDINATES
========================= */

async function getCoordinates(city) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?` +
        `name=${encodeURIComponent(city)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Geocoding request failed."
        );

    }

    const data =
        await response.json();

    if (
        !data.results ||
        data.results.length === 0
    ) {

        return null;

    }

    return data.results[0];

}


/* =========================
   GET WEATHER
========================= */

async function getWeather(
    latitude,
    longitude
) {

    const url =
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,` +
        `apparent_temperature,weather_code,wind_speed_10m,` +
        `surface_pressure,visibility` +
        `&daily=weather_code,temperature_2m_max,` +
        `temperature_2m_min,sunrise,sunset` +
        `&timezone=auto` +
        `&forecast_days=6`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Weather request failed."
        );

    }

    return await response.json();

}


/* =========================
   DISPLAY WEATHER
========================= */

function displayWeather(
    location,
    weather
) {

    const current =
        weather.current;

    const daily =
        weather.daily;


    /* Location */

    document.getElementById(
        "cityName"
    ).textContent =
        `${location.name}, ${location.country_code || ""}`;


    /* Description */

    document.getElementById(
        "weatherDescription"
    ).textContent =
        getWeatherDescription(
            current.weather_code
        );


    /* Temperature */

    document.getElementById(
        "temperature"
    ).textContent =
        `${Math.round(
            current.temperature_2m
        )}°C`;


    /* Feels Like */

    document.getElementById(
        "feelsLike"
    ).textContent =
        `Feels like ${Math.round(
            current.apparent_temperature
        )}°C`;


    /* Weather Icon */

    document.getElementById(
        "weatherIcon"
    ).textContent =
        getWeatherIcon(
            current.weather_code
        );


    /* Humidity */

    document.getElementById(
        "humidity"
    ).textContent =
        `${current.relative_humidity_2m}%`;


    /* Wind */

    document.getElementById(
        "wind"
    ).textContent =
        `${Math.round(
            current.wind_speed_10m
        )} km/h`;


    /* Visibility */

    document.getElementById(
        "visibility"
    ).textContent =
        `${Math.round(
            current.visibility / 1000
        )} km`;


    /* Pressure */

    document.getElementById(
        "pressure"
    ).textContent =
        `${Math.round(
            current.surface_pressure
        )} hPa`;


    /* Sunrise */

    document.getElementById(
        "sunrise"
    ).textContent =
        formatTime(
            daily.sunrise[0]
        );


    /* Sunset */

    document.getElementById(
        "sunset"
    ).textContent =
        formatTime(
            daily.sunset[0]
        );


    renderForecast(
        daily
    );

}


/* =========================
   FORECAST
========================= */

function renderForecast(daily) {

    const forecastGrid =
        document.getElementById(
            "forecastGrid"
        );

    forecastGrid.innerHTML = "";


    for (
        let i = 1;
        i < Math.min(6, daily.time.length);
        i++
    ) {

        const date =
            new Date(
                `${daily.time[i]}T12:00:00`
            );

        const dayName =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const icon =
            getWeatherIcon(
                daily.weather_code[i]
            );


        const description =
            getWeatherDescription(
                daily.weather_code[i]
            );


        const card =
            document.createElement(
                "div"
            );

        card.className =
            "forecast-card";


        card.innerHTML = `

            <div class="forecast-day">
                ${dayName}
            </div>

            <div class="forecast-icon">
                ${icon}
            </div>

            <div class="forecast-temp">
                ${Math.round(
                    daily.temperature_2m_max[i]
                )}° /
                ${Math.round(
                    daily.temperature_2m_min[i]
                )}°
            </div>

            <div class="forecast-description">
                ${description}
            </div>

        `;


        forecastGrid.appendChild(
            card
        );

    }

}


/* =========================
   WEATHER CODES
========================= */

function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if (code === 1 || code === 2) {
        return "🌤️";
    }

    if (code === 3) {
        return "☁️";
    }

    if (
        code === 45 ||
        code === 48
    ) {
        return "🌫️";
    }

    if (
        code >= 51 &&
        code <= 57
    ) {
        return "🌦️";
    }

    if (
        code >= 61 &&
        code <= 67
    ) {
        return "🌧️";
    }

    if (
        code >= 71 &&
        code <= 77
    ) {
        return "🌨️";
    }

    if (
        code >= 80 &&
        code <= 82
    ) {
        return "🌦️";
    }

    if (
        code >= 85 &&
        code <= 86
    ) {
        return "🌨️";
    }

    if (
        code >= 95
    ) {
        return "⛈️";
    }

    return "🌤️";

}


function getWeatherDescription(code) {

    const descriptions = {

        0: "Clear sky",

        1: "Mainly clear",

        2: "Partly cloudy",

        3: "Overcast",

        45: "Fog",

        48: "Rime fog",

        51: "Light drizzle",

        53: "Moderate drizzle",

        55: "Dense drizzle",

        61: "Slight rain",

        63: "Moderate rain",

        65: "Heavy rain",

        71: "Slight snow",

        73: "Moderate snow",

        75: "Heavy snow",

        80: "Rain showers",

        81: "Moderate showers",

        82: "Heavy showers",

        95: "Thunderstorm",

        96: "Thunderstorm with hail",

        99: "Thunderstorm with heavy hail"

    };

    return descriptions[code] ||
        "Variable conditions";

}


/* =========================
   TIME
========================= */

function formatTime(dateString) {

    const date =
        new Date(dateString);

    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


function displayDate() {

    document.getElementById(
        "currentDate"
    ).textContent =
        new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "short",
                day: "numeric"
            }
        );

}


/* =========================
   LOADING
========================= */

function showLoading() {

    loading.classList.add("show");

    weatherContent.style.display =
        "none";

}


function hideLoading() {

    loading.classList.remove("show");

    weatherContent.style.display =
        "grid";

}


/* =========================
   ERROR
========================= */

function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.classList.add(
        "show"
    );

}


function hideError() {

    errorMessage.classList.remove(
        "show"
    );

}


/* =========================
   RECENT SEARCHES
========================= */

function saveRecentSearch(city) {

    let searches =
        JSON.parse(
            localStorage.getItem(
                "skycast_searches"
            )
        ) || [];


    searches =
        searches.filter(
            item =>
                item.toLowerCase() !==
                city.toLowerCase()
        );


    searches.unshift(city);

    searches =
        searches.slice(0, 5);


    localStorage.setItem(
        "skycast_searches",
        JSON.stringify(searches)
    );


    renderRecentSearches();

}


function renderRecentSearches() {

    const searches =
        JSON.parse(
            localStorage.getItem(
                "skycast_searches"
            )
        ) || [];


    recentSearches.innerHTML = "";


    searches.forEach(city => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "recent-item";

        button.textContent =
            `↻ ${city}`;


        button.addEventListener(
            "click",
            () => {

                cityInput.value =
                    city;

                searchCity(city);

            }
        );


        recentSearches.appendChild(
            button
        );

    });

}


/* =========================
   THEME
========================= */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const light =
            document.body.classList.contains(
                "light"
            );


        localStorage.setItem(
            "skycast_theme",
            light
                ? "light"
                : "dark"
        );


        themeIcon.textContent =
            light
                ? "☀"
                : "☾";

    }
);


function loadTheme() {

    const saved =
        localStorage.getItem(
            "skycast_theme"
        );


    if (saved === "light") {

        document.body.classList.add(
            "light"
        );

        themeIcon.textContent =
            "☀";

    }

}
