/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";

  //HINT: Use template literals to create a url with input and an API key
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  console.log(FULL_URL);

  //CODE GOES HERE
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response) => {
      return response.json();
  })
}

//console.log(getWeatherData('Detroit'));


/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = () => {
  const city = document.getElementById('city-input').value;
  // CODE GOES HERE
  getWeatherData(city)
  .then((response) => {
    console.log(response);
    showWeatherData(response);
  }).catch((error) => {
    console.log(error);
  })

}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  console.log(weatherData.name);

  document.getElementById('city-name').innerText = weatherData.name;

  let weatherType = weatherData.weather[0].description

  document.getElementById('weather-type').innerText = weatherType[0].toUpperCase() + weatherType.substr(1);

  //(32°F − 32) × 5/9 = 0°C

  let temp = (weatherData.main.temp - 32) * 5/9;
  let maxTemp = (weatherData.main.temp_max - 32) * 5/9;
  let minTemp = (weatherData.main.temp_min - 32) * 5/9;

  document.getElementById('temp').innerText = temp.toFixed(1);
  document.getElementById('min-temp').innerText = minTemp.toFixed(1);
  document.getElementById('max-temp').innerText = maxTemp.toFixed(1);
}

