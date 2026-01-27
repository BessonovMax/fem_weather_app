import Logo from "./assets/images/logo.svg";
import DropDownMenu from "./DropDownMenu";
import Sun from "./assets/images/icon-sunny.webp";
import Search from "./Search";
import CurrentDetails from "./CurrentDetails";
import DailyDetails from "./DailyDetails";

import { useEffect, useState } from "react";
import { fetchWeatherData } from "./api/weather";
import {
  type CurrentWeatherData,
  type DailyWeatherData,
  type HourlyWeatherData,
  type WeatherApiResponse,
} from "./types";
import {
  formatApiResponseDate,
  formatDailyApiResponseDate,
  formatHourlyWeatherData,
} from "./utils/FormatApiResponse";
import HourlyForecast from "./HourlyForecast";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null,
  );

  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);

  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData | null>(
    null,
  );

  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData | null>(
    null,
  );

  useEffect(() => {
    const loadWeatherData = async () => {
      const weatherData = await fetchWeatherData();
      setWeatherData(weatherData);
      setCurrentWeather(weatherData.current);
      setDailyWeather(weatherData.daily);
      setHourlyWeather(formatHourlyWeatherData(weatherData.hourly));
    };
    loadWeatherData();
  }, []);

  if (!weatherData || !currentWeather || !hourlyWeather || !dailyWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-dvh bg-neutral-900 p-4 md:p-6 lg:py-12">
      <div className="mx-auto flex flex-col gap-12 text-white lg:max-w-[1216px] lg:gap-16">
        <header className="flex items-center justify-between">
          <img className="h-[28px] md:h-[40px]" src={Logo} alt="Logo" />
          <DropDownMenu />
        </header>
        <h1 className="text-preset-2 self-center text-center md:max-w-[482px] lg:max-w-full">
          How's the sky looking today?
        </h1>
        <Search />

        <main className="grid gap-8 lg:grid-cols-[800px_1fr]">
          <div className="flex flex-col gap-8 lg:w-[800px] lg:gap-12">
            <div className="flex flex-col gap-5 lg:gap-8">
              <div className="flex flex-col gap-4 rounded-[20px] bg-[url(./images/bg-today-small.svg)] bg-cover py-[41px] md:flex-row md:justify-between md:bg-[url(./images/bg-today-large.svg)] md:px-6 md:py-[83px]">
                <div className="flex flex-col items-center gap-3 md:items-start md:justify-center">
                  <h2 className="text-preset-4">Orenburg, Russia</h2>
                  <div className="text-preset-6 text-white/80">
                    {formatApiResponseDate(currentWeather.time)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-5">
                    <img className="w-[120px]" src={Sun} alt="Weather icon" />
                    <div className="text-preset-1">
                      {currentWeather.temperature_2m.toFixed()}°
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(163.5px,1fr))] gap-4 md:gap-5 lg:gap-6">
                <CurrentDetails
                  detail="Feels Like"
                  value={`${currentWeather.apparent_temperature.toFixed()}°`}
                />
                <CurrentDetails
                  detail="Humidity"
                  value={`${currentWeather.relative_humidity_2m}%`}
                />
                <CurrentDetails
                  detail="Wind"
                  value={`${currentWeather.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`}
                />
                <CurrentDetails
                  detail="Precipitation"
                  value={`${currentWeather.precipitation} ${weatherData.current_units.precipitation}`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-preset-5">Daily forecast</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(89.14px,1fr))] gap-4">
                {dailyWeather.time.map((time, index) => (
                  <DailyDetails
                    key={time}
                    weatherCode={dailyWeather.weather_code[index]}
                    tMax={dailyWeather.temperature_2m_max[index].toFixed()}
                    tMin={dailyWeather.temperature_2m_min[index].toFixed()}
                    day={formatDailyApiResponseDate(time)}
                  />
                ))}
              </div>
            </div>
          </div>
          <HourlyForecast hourlyWeather={hourlyWeather} />
        </main>
      </div>
    </div>
  );
}

export default App;

{
  /* Units Switch to Imperial/Metric Temperature Celsius (°C) Fahrenheit (°F)
      Wind Speed km/h mph Precipitation Millimeters (mm) Inches (in) How's the
      sky looking today? Search for a city, e.g., New York Search Feels like
      Humidity Wind Precipitation Daily forecast Hourly forecast */
}
