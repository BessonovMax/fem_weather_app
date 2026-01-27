import Logo from "./assets/images/logo.svg";
import DropDownMenu from "./components/DropDownMenu";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import { fetchWeatherData } from "./api/weather";
import {
  type CurrentWeatherData,
  type DailyWeatherData,
  type HourlyWeatherData,
  type WeatherApiResponse,
} from "./types";
import { formatHourlyWeatherData } from "./utils/FormatApiResponse";
import HourlyForecast from "./hourlyWeather/HourlyForecast";
import DailyForecast from "./dailyWeather/DailyForecast";
import CurrentForecast from "./currentWeather/CurrentForecast";

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

  const [measurementUnit, setMeasurementUnit] = useState<"Metric" | "Imperial">(
    "Metric",
  );

  useEffect(() => {
    const loadWeatherData = async () => {
      const weatherData = await fetchWeatherData(measurementUnit);
      setWeatherData(weatherData);
      setCurrentWeather(weatherData.current);
      setDailyWeather(weatherData.daily);
      setHourlyWeather(formatHourlyWeatherData(weatherData.hourly));
    };
    loadWeatherData();
  }, [measurementUnit]);

  if (!weatherData || !currentWeather || !hourlyWeather || !dailyWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-dvh bg-neutral-900 p-4 md:p-6 lg:py-12">
      <div className="mx-auto flex flex-col gap-12 text-white lg:max-w-[1216px] lg:gap-16">
        <header className="flex items-center justify-between">
          <img className="h-[28px] md:h-[40px]" src={Logo} alt="Logo" />
          <DropDownMenu
            measurementUnit={measurementUnit}
            setMesurementUnit={setMeasurementUnit}
          />
        </header>
        <h1 className="text-preset-2 self-center text-center md:max-w-[482px] lg:max-w-full">
          How's the sky looking today?
        </h1>
        <Search />

        <main className="grid gap-8 lg:grid-cols-[800px_1fr]">
          <div className="flex flex-col gap-8 lg:w-[800px] lg:gap-12">
            <div className="flex flex-col gap-5 lg:gap-8">
              <CurrentForecast
                weatherData={weatherData}
                currentWeather={currentWeather}
              />

              <DailyForecast dailyWeather={dailyWeather} />
            </div>
          </div>
          <HourlyForecast hourlyWeather={hourlyWeather} />
        </main>
      </div>
    </div>
  );
}

export default App;
