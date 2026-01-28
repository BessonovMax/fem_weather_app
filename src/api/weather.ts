import type { Geolocation, WeatherApiResponse } from "../types";

export async function fetchWeatherData(
  measurementUnit: "Metric" | "Imperial" = "Metric",
  location?: Geolocation | null,
): Promise<WeatherApiResponse> {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${location?.latitude}&longitude=${location?.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m${measurementUnit === "Metric" ? "" : "&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"}`;
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data: WeatherApiResponse = await response.json();
  return data;
}
