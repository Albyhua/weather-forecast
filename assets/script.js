var button = document.querySelector('button')
var userInput = document.querySelector('input')
var form = document.querySelector('form')
var forecast = document.querySelector('.forecast')
// const weather = document.querySelector('weather')
// const forecast = document.querySelector('forecast')
// const location = document.querySelector('location')
var forecastCont = document.querySelector('.forecastCont')


var apiKey = "9ac482b1f394f1059d1b4a11c39a8898";
var city = userInput.value
// const searchOutput = `https://api.openweathermap.org/data/2.5/forecast?q=${userValue}&appid=${apiKey}&units=imperial`;

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = userInput.value;
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    checkweather(city);
    // renderforecast(dailyforecast);
})



function checkweather(city) {
    const searchOutput = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(searchOutput)
        .then(response => response.json()) // parse the response as JSON, converting to string
        .then(data => {
            console.log(data)
            var fivedayForecast = data.list[i]
            var weatherForecast = data.list[0];
            console.log(weatherForecast)
            var temperature = weatherForecast.main.temp;
            var windSpeed = weatherForecast.wind.speed;
            var humidity = weatherForecast.main.humidity;
            var iconTag = weatherForecast.weather[0].icon;
            forecastCont.innerHTML = '';
            console.log(iconTag)
            var tempEl = document.createElement('p');
            var heading = document.createElement('h2');
            var windEl = document.createElement('p');
            var humidEl = document.createElement('p');


            var iconUrl = `http://openweathermap.org/img/w/${iconTag}.png`;
            var img = document.createElement('img');
            img.src = iconUrl 
            document.body.appendChild(img);
            img.width = 50;
            img.height = 50;
            tempEl.textContent = `temp:${temperature} C`;
            heading.textContent = city;
            windEl.textContent = `wind:${windSpeed} m/s`;
            humidEl.textContent = `humidity:${humidity} %`;



            var card = document.createElement('div');
            var cardBody = document.createElement('div');
            card.setAttribute('class', 'card');
            cardBody.classList.add('card','bg-light', 'border', 'border-primary', 'w-25','p-2', 'm-2')
            card.append(cardBody);

            cardBody.append(heading, img, tempEl, windEl, humidEl);

            forecastCont.append(cardBody);

            for (var i = 0; i < data.list.length; i +=8) {

                var fivedayForecast = data.list[i]
                // fiveDayCard.setAttribute('card', 'bg-info')         
                // forecast.append(fiveDayCard);    
                
                var tempForecast = fivedayForecast.main.temp;
                var windForecast = fivedayForecast.wind.speed;
                var humidForecast = fivedayForecast.main.humidity;
                var iconForecast = fivedayForecast.weather.icon;
                console.log(iconForecast)
                var iconUrlForecast = `http://openweathermap.org/img/w/${iconForecast}.png`;
                var imgForecast = document.createElement('img');
                imgForecast.src = iconUrlForecast 
                document.body.appendChild(imgForecast);
                imgForecast.width = 50;
                imgForecast.height = 50;
    
                // forecast.innerHTML = '';
    
                var tempForecastEl = document.createElement('p');
                var windForecastEl = document.createElement('p');
                var humidForecastEl = document.createElement('p');
    
                tempForecastEl.textContent = `temp:${tempForecast} C`;
                windForecastEl.textContent = `wind:${windForecast} m/s`;
                humidForecastEl.textContent = `humidity:${humidForecast} %`;
                
                var fiveDayCard = document.createElement('div');
                fiveDayCard.classList.add('card', 'bg-info', 'border', 'border-primary', 'p-2', 'm-2')         
                forecast.append(fiveDayCard);  
    
    
                fiveDayCard.append(imgForecast ,tempForecastEl, windForecastEl, humidForecastEl);}
        })


        // .then(response => response.json())
        // .then(data => {
   
        //     for (var i = 0; i < data.list.length; i +=8) {

        //     var fivedayForecast = data.list[i]
        //     // fiveDayCard.setAttribute('card', 'bg-info')         
        //     // forecast.append(fiveDayCard);    
            
        //     var tempForecast = fivedayForecast.main.temp;
        //     var windForecast = fivedayForecast.wind.speed;
        //     var humidForecast = fivedayForecast.main.humidity;
        //     var iconForecast = fivedayForecast.weather[i].icon;
        //     var iconUrlForecast = `http://openweathermap.org/img/w/${iconForecast}.png`;
        //     var imgForecast = document.createElement('img');
        //     imgForecast.src = iconUrlForecast 
        //     document.body.appendChild(imgForecast);
        //     imgForecast.width = 50;
        //     imgForecast.height = 50;

        //     forecast.innerHTML = '';

        //     var tempForecastEl = document.createElement('p');
        //     var windForecastEl = document.createElement('p');
        //     var humidForecastEl = document.createElement('p');

        //     tempForecastEl.textContent = `temp:${tempForecastEl} C`;
        //     windForecastEl.textContent = `wind:${windForecast} m/s`;
        //     humidForecastEl.textContent = `humidity:${humidForecast} %`;

        //     fiveDayCard.classList.add('card', 'bg-info', 'border', 'border-primary', 'p-2', 'm-2')         
        //     forecast.append(fiveDayCard);  


        //     cardBody.append(imgForecast ,tempForecastEl, windForecastEl, humidForecastEl);

        //     }

        // })

        .catch(error => console.error('Error:', error)); // log any errors that occur
}



function renderforecast(dailyforecast) {
    var startDate = dayjs().add(1, "day").startOf("day").unix()
    var endDate = dayjs().add(6, "day").endOf("day").unix()

    var headingCol = document.createElement('div')
    var heading = document.createElement('h4')
    headingCol.setAttribute('class', 'col-12')
    heading.textContent = "five day forecast"

    headingCol.append(heading)
    forecast.innerHTML = '';
    forecast.append(headingCol);

    for (var i = 0; i < dailyforecast.length; i++) {
        if (dailyforecast[i].dt >= startDate && dailyforecast[i].dt <= endDate) {
            if (dailyforecast[i].dt_txt.slice(11, 13) == "12") { //getting data
                myForecastData(dailyforecast[i])
            }
        }
    }


}

function saveHistory() {

}

function getHistory() {

}
