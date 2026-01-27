import { useState } from "react";
import DropDownIcon from "../assets/images/icon-dropdown.svg";
import HourlyDetails from "./HourlyDetails";
import type { HourlyWeatherData } from "../types";

type Props = {
  hourlyWeather: HourlyWeatherData;
};

export default function HourlyForecast({ hourlyWeather }: Props) {
  const [dayOfWeek, setDayOfWeek] = useState(hourlyWeather[0]?.day);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 py-5 md:py-6">
      <div className="flex items-center justify-between px-4 md:px-6">
        <div className="text-preset-5">Hourly forecast</div>
        <button
          onClick={toggleMenu}
          className="relative flex cursor-pointer items-center gap-3 rounded-lg bg-neutral-600 px-4 py-2"
        >
          <div className="text-preset-7">{dayOfWeek}</div>
          <img
            className={`w-[12px] ${showMenu ? "rotate-180 transition duration-75" : "transition duration-75"}`}
            src={DropDownIcon}
            alt="Menu"
          />

          {showMenu && (
            <div className="absolute top-10 right-0 z-10 flex min-w-[214px] flex-col gap-1 rounded-xl border-1 border-neutral-600 bg-neutral-800 p-2 drop-shadow-lg">
              {hourlyWeather.map((day) => (
                <div
                  key={day.day}
                  onClick={() => {
                    setDayOfWeek(day.day);
                    setShowMenu(false);
                  }}
                  className={`text-preset-7 text-start ${day.day === dayOfWeek ? "bg-neutral-700" : ""} cursor-pointer rounded-lg px-2 py-2.5 hover:bg-neutral-700`}
                >
                  {day.day}
                </div>
              ))}
            </div>
          )}
        </button>
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
