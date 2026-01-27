import weatherCodeToIcon from "../utils/WeatherCodeToIcon";

type Props = {
  time: string;
  tAvg: string;
  weatherCode: number;
};

export default function HourlyDetails({ time, tAvg, weatherCode }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border-1 border-neutral-600 bg-neutral-700 py-[9px] pr-4 pl-3">
      <div className="flex items-center gap-2">
        <img
          className="h-[40px] w-[40px]"
          src={weatherCodeToIcon(weatherCode)}
          alt=""
        />
        <div className="text-preset-5-medium">{time}</div>
      </div>
      <div className="text-preset-7">{tAvg}°</div>
    </div>
  );
}
