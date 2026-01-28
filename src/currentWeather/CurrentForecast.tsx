import { formatApiResponseDate } from "../utils/FormatApiResponse";
import CurrentDetails from "./CurrentDetails";
import Sun from "../assets/images/icon-sunny.webp";
import { type CurrentWeatherData, type WeatherApiResponse } from "../types";

type Props = {
  weatherData: WeatherApiResponse;
  currentWeather: CurrentWeatherData;
  name: string;
  country: string;
};

export default function CurrentForecast({
  weatherData,
  currentWeather,
  name,
  country,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-[20px] bg-[url(./images/bg-today-small.svg)] bg-cover py-[41px] md:flex-row md:justify-between md:bg-[url(./images/bg-today-large.svg)] md:px-6 md:py-[83px]">
        <div className="flex flex-col items-center gap-3 md:items-start md:justify-center">
          <h2 className="text-preset-4">
            {name}, {country}
          </h2>
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
    </>
  );
}
