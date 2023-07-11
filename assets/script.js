var button = document.querySelector('button')
var userInput = document.querySelector('input')
var form = document.querySelector('form')
var forecast = document.querySelector('forecast')
// const weather = document.querySelector('weather')
// const forecast = document.querySelector('forecast')
// const location = document.querySelector('location')



var apiKey = "9ac482b1f394f1059d1b4a11c39a8898";
var city = userInput.value
// const searchOutput = `https://api.openweathermap.org/data/2.5/forecast?q=${userValue}&appid=${apiKey}&units=imperial`;

form.addEventListener('submit', function(event){
    event.preventDefault();
    var city = userInput.value;
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    checkweather(city);
 })



function checkweather(city) {
    const searchOutput = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
   
    fetch(searchOutput)
        .then(response => response.json()) // parse the response as JSON, converting to string
        .then(weatherData => console.log(weatherData)) // log the parsed JSON
        .catch(error => console.error('Error:', error)); // log any errors that occur

        // get info down to html
        var weatherForecast = weatherData.list[i];
        var temperature =  weatherForecast.main.temp;
        var windSpeed = weatherForecast.wind.speed;
        var humidity = weatherForecast.main.humidity;

    for (var i = 0; i < weatherForecast.length; i++) {


    }
    
}
