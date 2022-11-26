const API_KEY = "48dca3f560e9138899881114100ce6f2";

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    

    
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        localizacion: data.name,
        descripcion: data.weather[0].description,
        humedad: 'Humedad: ' + data.main.humidity + '%',
        temperatura: Math.round(data.main.temp) + '°',  
        fecha: getDate(),
    }
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()} / ${ ('0' + (date.getMonth() + 1)).slice(-2)} / ${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}