import { useEffect, useState } from "react";
import { fetchWeatherData } from "./api/weather";
import { fetchUserLocationByCoords } from "./api/location";
import { type Geolocation, type WeatherApiResponse } from "./types";
import { formatHourlyWeatherData } from "./utils/FormatApiResponse";
import DropDownMenu from "./components/DropDownMenu";
import Search from "./components/Search";
import HourlyForecast from "./hourlyWeather/HourlyForecast";
import DailyForecast from "./dailyWeather/DailyForecast";
import CurrentForecast from "./currentWeather/CurrentForecast";
import MainSkeleton from "./skeletons/MainSkeleton";
import Logo from "./assets/images/logo.svg";
import ErrorIcon from "./assets/images/icon-error.svg";
import RetryIcon from "./assets/images/icon-retry.svg";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [apiError, setApiError] = useState(false);

  const [location, setLocation] = useState<Geolocation | null>(null);

  const [measurementUnit, setMeasurementUnit] = useState<"Metric" | "Imperial">(
    "Metric",
  );

  const handleApiError = () => {
    setApiError(!apiError);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        try {
          setIsLoading(true);
          const userLocationData: Geolocation = await fetchUserLocationByCoords(
            position.coords.latitude,
            position.coords.longitude,
          );
          setLocation(userLocationData);
        } catch (error) {
          console.error("Error fetching user location:", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
    );
  }, []);

  useEffect(() => {
    const loadWeatherData = async (location: Geolocation) => {
      setIsLoading(true);
      const weatherData = await fetchWeatherData(measurementUnit, location);
      setWeatherData(weatherData.data);
      if (weatherData.status >= 200 && weatherData.status < 300) {
        setIsLoading(false);
      }
    };

    if (location) {
      loadWeatherData(location);
    }
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
        {apiError ? (
          <div className="mt-10 flex flex-col items-center gap-6 text-white">
            <img className="w-10.5" src={ErrorIcon} alt="Error" />
            <h2 className="text-preset-2">Something went wrong</h2>
            <div className="text-preset-5-medium text-neutral-200">
              We couldn’t connect to the server (API error). Please try again in
              a few moments.
            </div>
            <button
              onClick={handleApiError}
              className="text-preset-7 group flex cursor-pointer gap-2.5 rounded-lg bg-neutral-800 px-4 py-3"
            >
              <img
                className="w-4 transition duration-600 group-hover:rotate-180"
                src={RetryIcon}
                alt="Retry"
              />
              Retry
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-preset-2 self-center text-center md:max-w-[482px] lg:max-w-full">
              How's the sky looking today?
            </h1>
            <Search setApiError={setApiError} setLocation={setLocation} />

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
                          name={location?.name}
                          country={location?.country}
                        />
                      </div>
                      <DailyForecast dailyWeather={weatherData.daily} />
                    </div>
                    <HourlyForecast
                      hourlyWeather={formatHourlyWeatherData(
                        weatherData.hourly,
                      )}
                    />
                  </>
                )}
              </main>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
