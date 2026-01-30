import weatherCodeToIcon from "../utils/WeatherCodeToIcon";

type Props = {
  day: string;
  tMax: string;
  tMin: string;
  weatherCode: number;
};

export default function DailyDetails({ day, tMax, tMin, weatherCode }: Props) {
  return (
    <div className="flex h-[165px] flex-col items-center gap-4 rounded-xl border-1 border-neutral-600 bg-neutral-800 px-2.5 py-4">
      <div className="text-preset-6">{day}</div>
      <img
        className="h-[60px] w-[60px]"
        src={weatherCodeToIcon(weatherCode)}
        alt=""
      />
      <div className="text-preset-7 flex w-full justify-between">
        <div>{tMax}°</div>
        <div className="text-neutral-200">{tMin}°</div>
      </div>
    </div>
  );
}
