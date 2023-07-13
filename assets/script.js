var button = document.querySelector('button')
var userInput = document.querySelector('input')
var form = document.querySelector('form')
var forecast = document.querySelector('.forecast') // remember the period in classes
var forecastCont = document.querySelector('.forecastCont')
var history = document.querySelector('.history')


var apiKey = "9ac482b1f394f1059d1b4a11c39a8898";
var city = userInput.value
// const searchOutput = `https://api.openweathermap.org/data/2.5/forecast?q=${userValue}&appid=${apiKey}&units=imperial`;

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = userInput.value;
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

     userInput.value = ''; // clears user input so they can 
     forecast.innerHTML = ''; // refreshes every time a new user input is placed
    checkweather(city);
    saveHistory();
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


                // getting date
                var date = document.createElement("h3");
                date.textContent = new Date(fivedayForecast.dt * 1000).toLocaleDateString();


                var tempForecastEl = document.createElement('p');
                var windForecastEl = document.createElement('p');
                var humidForecastEl = document.createElement('p');
    
                tempForecastEl.textContent = `temp:${tempForecast} C`;
                windForecastEl.textContent = `wind:${windForecast} m/s`;
                humidForecastEl.textContent = `humidity:${humidForecast} %`;
                
                var fiveDayCard = document.createElement('div');
                fiveDayCard.classList.add('card', 'bg-info', 'border', 'border-primary', 'p-2', 'm-2')         
                forecast.append(fiveDayCard);  
    
    
                fiveDayCard.append(imgForecast, date ,tempForecastEl, windForecastEl, humidForecastEl);}
        })


        .catch(error => console.error('Error:', error)); // log any errors that occur
}



function saveHistory(city) {
    var prevSearch = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history.innerHTML = ''; // Clear the previous content
    for (let i = 0; i < prevSearch.length; i++) {
        var searchHistory = document.createElement("p");
        searchHistory.textContent = prevSearch[i];
        history.append(searchHistory);
    }
    // document.getElementById('history').classList.remove("hidden"); // Corrected typo, but you can remove this line if it's not necessary
}



function getHistory() {

}
