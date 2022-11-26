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

function notifyMe() {
    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
      console.log("Este navegador no es compatible con las notificaciones de escritorio");
    }
  
    // Comprobamos si los permisos han sido concedidos anteriormente
    else if (Notification.permission === "granted") {
      // Si es correcto, lanzamos una notificación
      var notification = new Notification("Hola!");
    }
  
    // Si no, pedimos permiso para la notificación
    else if (Notification.permission !== 'denied' || Notification.permission === "default") {
      Notification.requestPermission(function (permission) {
        // Si el usuario nos lo concede, creamos la notificación
        if (permission === "granted") {
          var notification = new Notification("Hola!");
        }
      });
    }
  
    // Por último, si el usuario ha denegado el permiso, y quieres ser respetuoso, no hay necesidad de molestarlo.
  }
  