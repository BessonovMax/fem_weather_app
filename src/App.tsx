import Logo from "./assets/images/logo.svg";
import DropDownMenu from "./components/DropDownMenu";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import { fetchWeatherData } from "./api/weather";
import { type Geolocation, type WeatherApiResponse } from "./types";
import { formatHourlyWeatherData } from "./utils/FormatApiResponse";
import HourlyForecast from "./hourlyWeather/HourlyForecast";
import DailyForecast from "./dailyWeather/DailyForecast";
import CurrentForecast from "./currentWeather/CurrentForecast";
import MainSkeleton from "./skeletons/MainSkeleton";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState<Geolocation | null>(null);

  const [measurementUnit, setMeasurementUnit] = useState<"Metric" | "Imperial">(
    "Metric",
  );

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      const weatherData = await fetchWeatherData(measurementUnit, location);
      setWeatherData(weatherData.data);
      if (weatherData.status === 200) setIsLoading(false);
    };
    if (location) loadWeatherData();
  }, [measurementUnit, location]);

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
        <Search setLocation={setLocation} />

        {location && (
          <main className="grid gap-8 lg:grid-cols-[800px_1fr]">
            {!weatherData || isLoading ? (
              <MainSkeleton />
            ) : (
              <>
                <div className="flex flex-col gap-8 lg:w-[800px] lg:gap-12">
                  <div className="flex flex-col gap-5 lg:gap-8">
                    <CurrentForecast
                      weatherData={weatherData}
                      currentWeather={weatherData.current}
                      name={location?.name || "Unknown"}
                      country={location?.country || "Unknown"}
                    />
                  </div>
                  <DailyForecast dailyWeather={weatherData.daily} />
                </div>
                <HourlyForecast
                  hourlyWeather={formatHourlyWeatherData(weatherData.hourly)}
                />
              </>
            )}
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
