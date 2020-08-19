// OpenWeather API Key
const apiKey = 'f3442f451fe2cb4f3ab0ccb47e9c43d1';

// Get Data by City
const requestCity = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${apiKey}`;

    // Make fetch call
    const response = await fetch(baseURL + query);

    // Promise data
    const data = await response.json();
    return data;
}

// Show Data In Site
const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const temperature = document.querySelector('.temp span');
const weatherCondition = document.querySelector('.condition');
const highTemperature = document.querySelector('.high span');
const lowTemperature = document.querySelector('.low span');
const weatherIcon = document.querySelector('.icon-container img')
const feelTemperature = document.querySelector('.feel-temp span');
const humidity = document.querySelector('.humidity span');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');



const spitOutCelsius = (kelvin) => {
    celsius = Math.round(kelvin - 273.15);
    return celsius;
}

const isDayTime = (icon) => {
    if (icon.includes('d')) {
        return true
    } else {
        return false;
    }
}


// Update data in UI 
updateWeatherApp = (city) => {
    const iconData = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${iconData}@2x.png`

    cityName.textContent = city.name;
    temperature.textContent = spitOutCelsius(city.main.temp);
    weatherCondition.textContent = city.weather[0].description;
    highTemperature.textContent = spitOutCelsius(city.main.temp_max);
    lowTemperature.textContent = spitOutCelsius(city.main.temp_min);  feelTemperature.textContent = spitOutCelsius(city.main.feels_like);
    humidity.textContent = city.main.humidity;
    weatherIcon.src = iconSrc;


    if (isDayTime(iconData)) {
        timeImage.setAttribute('src', 'img/day.svg');
        document.querySelector('.icon-container').style.background = "#ffcf24";
        document.querySelector('body').style.color = "#9b870c";

    } else {
        timeImage.setAttribute('src', 'img/night.svg');
        document.querySelector('.icon-container').style.background = "#04051f";
        document.querySelector('body').style.color = "#04051f";

    }

    cardInfo.classList.remove('d-none');

}


// Add an event listener to the form
searchForm.addEventListener('submit', submitLocation => {
    submitLocation.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCity(citySearched)
    .then((data) => {
        updateWeatherApp(data);
    })
    .catch((error) => {console.log(error)} )
});