import type { WeatherApiResponse } from "../types";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.7727&longitude=55.0988&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m";

export async function fetchWeatherData() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data: WeatherApiResponse = await response.json();
  return data;
}
