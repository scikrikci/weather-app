const input = document.getElementById('text');
const button = document.getElementById('text-button');
const noneText = document.querySelector('.none-text');
const weatherBox = document.querySelector('.weather-box');

const img = document.querySelector('.image');
const _tempature = document.querySelector('.temperature');
const _description = document.querySelector('.description');

button.addEventListener('click', () => {
    if (input.value === '') {
        noneText.innerHTML = 'Please enter a city';
        noneText.style.display = 'block';
        weatherBox.style.display = 'none';
    } else {
        const city = input.value;
        response(city);
    }
})

input.addEventListener('keypress', () => {
    noneText.style.display = 'none';
    weatherBox.style.display = 'none';
})

async function response(city) {
    console.log(city);
    const key = "5f430074bdc02e62d81e1a20dfb8f3fc"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
        noneText.style.display = 'block';
        noneText.innerHTML = 'City not found';
    } else {
        console.log(data);
        const { description } = data.weather[0];
        const { main } = data.weather[0];
        const { temp } = data.main;

        console.log(description, main, temp);
        switch (main) {
            case 'Clouds':
                img.src = 'data/cloud.png';
                break;
            case 'Clear':
                img.src = 'data/clear.png';
                break;
            case 'Rain':
                img.src = 'data/rain.png';
                break;
            case 'Snow':
                img.src = 'data/snow.png';
                break;
            case 'Haze':
                img.src = 'data/mist.png';
                break;
            default:
                img.src = '';
        }
        _tempature.innerHTML = `${Math.round(temp - 273.15)}°C`;
        _description.innerHTML = description;

        weatherBox.style.display = 'block';
    }


}

input.onkeyup = function(event) {
    if (this.value.length === 0) {
        weatherBox.style.display = 'none';
    }
  }