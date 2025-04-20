window.onload = function () {
    const apiKey = "dc8c9152e8adaad0ec8bf635818c0d42";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey + "&";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    function updateWeatherInfos(data) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    async function getWeatherByCity(city) {
        const url = apiUrl + "q=" + city;
        const response = await fetch(url);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            updateWeatherInfos(data);
        }
    }

    function getWeatherByCoords(lat, lon) {
        const url = apiUrl + "lat=" + lat + "&lon=" + lon;
        let requete = new XMLHttpRequest();
        requete.open("GET", url);
        requete.responseType = "json";
        requete.send();

        requete.onload = function () {
            if (requete.readyState === XMLHttpRequest.DONE && requete.status === 200) {
                let data = requete.response;
                updateWeatherInfos(data);
            }
        };
    }

    // Si l'utilisateur accepte la position
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                alert("Vous avez refusé la position");
                getWeatherByCity("Paris");
            },
            {
                enableHighAccuracy: true,
            }
        );
    } else {
        getWeatherByCity("Paris");
    }

    // Rechercher une ville avec le bouton ou Entrée
    searchBtn.addEventListener("click", () => {
        getWeatherByCity(searchBox.value);
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getWeatherByCity(searchBox.value);
        }
    });
};
