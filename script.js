document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const output = document.getElementById("weatherOutput");

  if (!city) {
    output.innerText = "Please enter a city name.";
    return;
  }

  output.innerText = "Fetching weather data...";

  const apiKey = "fa2090f83d5e4bd4925164631251107";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or API limit exceeded.");
    }

    const data = await response.json();

    const location = `${data.location.name}, ${data.location.country}`;
    const temperature = `${data.current.temp_c} °C`;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    output.innerHTML = `
      <strong>Location:</strong> ${location}<br>
      <strong>Temperature:</strong> ${temperature}<br>
      <strong>Condition:</strong> ${condition}<br>
      <img src="https:${icon}" alt="${condition}" />
    `;
  } catch (error) {
    output.innerText = `Error: ${error.message}`;
    console.error(error);
  }
}
