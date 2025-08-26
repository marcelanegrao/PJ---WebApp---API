const API_KEY = "dfb465774160bd9176e158d3b4bdea82";

async function buscarClima(event) {
  event.preventDefault();

  const cidade = document.getElementById("city-input").value;
  const weatherData = document.getElementById("weather-data");

  if (cidade === "") {
    weatherData.innerHTML = "Por favor, digite uma cidade.";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error("Cidade não encontrada");
    }

    const dados = await resposta.json();

    weatherData.innerHTML = `
      <div class="icon">
        <img src="http://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png" alt="Ícone do clima">
      </div>
      <div class="temperature">${dados.main.temp.toFixed(1)}°C</div>
      <div class="description">${dados.weather[0].description}</div>
      <div class="details">
        🌡️ Máx: ${dados.main.temp_max.toFixed(1)}°C | ❄️ Mín: ${dados.main.temp_min.toFixed(1)}°C <br>
        💨 Vento: ${dados.wind.speed} m/s <br>
        💧 Umidade: ${dados.main.humidity}%
      </div>
    `;
  } catch (erro) {
    weatherData.innerHTML = "Cidade não encontrada. Tente novamente.";
  }
}
