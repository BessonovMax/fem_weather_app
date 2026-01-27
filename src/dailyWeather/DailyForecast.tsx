import type { DailyWeatherData } from "../types";
import { formatDailyApiResponseDate } from "../utils/FormatApiResponse";
import DailyDetails from "./DailyDetails";

type Props = {
  dailyWeather: DailyWeatherData;
};

export default function DailyForecast({ dailyWeather }: Props) {
  return (
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
  );
}
