var button = document.querySelector('button')
var userInput = document.querySelector('input')
var form = document.querySelector('form')
var forecast = document.querySelector('forecast')
// const weather = document.querySelector('weather')
// const forecast = document.querySelector('forecast')
// const location = document.querySelector('location')
var forecastCont = document.querySelector('forecastCont')


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



function checkweather(city, index) {
    const searchOutput = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
   
    fetch(searchOutput)
        .then(response => response.json()) // parse the response as JSON, converting to string
        .then(data => {console.log(data)

        // var weatherForecast = weatherData.list[1];
        // var temperature =  weatherForecast.main.temp;
        // var windSpeed = weatherForecast.wind.speed;
        // var humidity = weatherForecast.main.humidity;

        // var temperature =  weatherData.main.temp;
        // var windSpeed = weatherData.wind.speed;
        // var humidity = weatherData.main.humidity;
        // forecastCont.innerHTML = '';
        
        tempEl.textContent = `temp:${data.main.temp}`
        heading.textContent = `${city}`
        windEl.textContent = `wind:${windSpeed}`
        humidEl.textContent = `humidity:${humidity}`

        

        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var heading = document.createElement('h2');
        card.setAttribute('class', 'card');
        cardBody.setAttribute('class', 'card-body');
        card.append(cardBody);
        
        cardBody.append(heading, tempEl, windEl, humidityEl);
        
        }) 

        .catch(error => console.error('Error:', error)); // log any errors that occur
}



function renderforecast(dailyforecast){
    var startDate = dayjs().add(1 , "day").startOf("day").unix()
    var endDate = dayjs().add(6, "day").endOf("day").unix()

    var headingCol = document.createElement('div')
    var heading = document.createElement('h4')
    headingCol.setAttribute('class', 'col-12')
    heading.textContent = "five day forecast"

    headingCol.append(heading)
    forecastCont.innerHTML = '';
    forecastCont.append(headingCol);

    for (var i= 0; i < dailyforecast.length; i++){
        if (dailyforecast[i].dt>=startDate && dailyforecast[i].dt<=endDate){
            if (dailyforecast[i].dt_txt.slice(11,13)=="12"){ //getting data
                myForecastData(dailyforecast[i])
            }
        }}

    
}

function saveHistory(){
    
}

function getHistory(){

}