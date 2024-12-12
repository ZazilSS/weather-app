const button = document.getElementById("search-button");
button.addEventListener("click", function () {
  const input = document.getElementById("city-input");
  const userInput = input.value;

  if (userInput === "") {
    alert("Пожалуйста, введите название города!");
    return;
  }

  const apiKey = "98933198c2ebe60fd7e8a95be7d1d1eb";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric&lang=ru`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;

        const weatherResult = document.getElementById("weather-result");
        weatherResult.textContent = `В городе ${cityName} сейчас ${temperature}°C. Погода: ${description}.`;
      } else {
        alert("Город не найден. Попробуйте снова!");
      }
    })
    .catch(error => {
      console.log("Ошибка запроса:", error);
      alert("Что-то пошло не так, попробуйте снова позже.");
    });

  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apiKey}&units=metric&lang=ru`;

  fetch(url2)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "200") {
        let forecastText = "";
        data.list.forEach((item, index) => {
          if (index % 8 === 0) {
            const temperature2 = item.main.temp;
            const description2 = item.weather[0].description;
            const dateTime = item.dt_text;

            forecastText += `Прогноз на ${dateTime}: ${temperature2}C. Погода: ${description2}.<br>`;
          }
        });

        const forecastResult = document.getElementById("forecast-result2");
        forecastResult.innerHTML = forecastText;
      } else {
        alert("Город не найден. Попробуйте снова!");
      }
    })
    .catch(error => {
      console.log("Ошибка запроса:", error);
      alert("Что-то пошло не так. Попробуйте позже!");
    });
});
