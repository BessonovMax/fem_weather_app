import { useState } from "react";
import DropDownIcon from "./assets/images/icon-dropdown.svg";
import HourlyDetails from "./HourlyDetails";
import type { HourlyWeatherData } from "./types";

type Props = {
  hourlyWeather: HourlyWeatherData;
};

export default function HourlyForecast({ hourlyWeather }: Props) {
  const [dayOfWeek, setDayOfWeek] = useState(hourlyWeather[0]?.day);
  console.log(hourlyWeather);
  return (
    <div className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 py-5 md:py-6">
      <div className="flex items-center justify-between px-4 md:px-6">
        <div className="text-preset-5">Hourly forecast</div>
        <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-neutral-600 px-4 py-2">
          <div className="text-preset-7">{dayOfWeek}</div>

          <img className="w-[12px]" src={DropDownIcon} alt="Menu" />
        </div>
      </div>
      <div className="scrollbar-thin flex max-h-[592px] flex-col gap-4 overflow-y-auto px-4 md:px-6">
        {hourlyWeather[0].time.map((time, index) => (
          <HourlyDetails
            key={time}
            weatherCode={
              hourlyWeather[
                hourlyWeather.findIndex((days) => days.day === dayOfWeek)
              ].weather_code[index]
            }
            tAvg={
              hourlyWeather[
                hourlyWeather.findIndex((days) => days.day === dayOfWeek)
              ].temperature_2m[index]
            }
            time={time}
          />
        ))}
      </div>
    </div>
  );
}
