var dayOne = $('.dayOne');
var dayTwo = $('.dayTwo');
var dayThree = $('.dayThree');
var dayFour = $('.dayFour');
var dayFive = $('.dayFive');
var userInput = $('.input');
var weather = $('.weather');
var temperature = $('.temp');
var humidity = $('.humid');
var wind = $('.wind');
var button = $('.button');
var location = $('.location');

$('button').on('click', function () {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q= '+userInput.value+' &limit=5&appid=9ac482b1f394f1059d1b4a11c39a8898')
    .then(response => response.json())
    .then(data => console.log(data))

console.log(fetch);
})