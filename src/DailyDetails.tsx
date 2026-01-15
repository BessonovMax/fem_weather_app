import IconSun from "./assets/images/icon-sunny.webp";

type Props = {
  day: string;
  tMax: string;
  tMin: string;
  weatherCode: number;
};

export default function DailyDetails(/* { day, tMax, tMin, weatherCode }: Props */) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border-1 border-neutral-600 bg-neutral-800 px-2.5 py-4">
      <div className="text-preset-6">Tue</div>
      <img className="h-[60px] w-[60px]" src={IconSun} alt="" />
      <div className="text-preset-7 flex w-full justify-between">
        <div>20°</div>
        <div className="text-neutral-200">14°</div>
      </div>
    </div>
  );
}
