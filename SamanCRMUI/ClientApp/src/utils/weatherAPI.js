import axios from "axios";

export async function fetchWeather(city, setError) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7502dd523ccdd6a48521429f062f4228`;

  try {
    const response = await axios.get(url);
    setError("");
    return response.data;
  } catch (error) {
    setError("City Not Found!");
    return error;
  }
}