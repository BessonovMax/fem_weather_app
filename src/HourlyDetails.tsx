import IconSun from "./assets/images/icon-sunny.webp";

export default function HourlyDetails() {
  return (
    <div className="flex max-h-[60px] items-center justify-between rounded-lg border-1 border-neutral-600 bg-neutral-700 py-2.5 pr-4 pl-3">
      <div className="flex items-center gap-2">
        <img className="h-[40px] w-[40px]" src={IconSun} alt="" />
        <div className="text-preset-5">5 PM</div>
      </div>
      <div className="text-preset-7">20°</div>
    </div>
  );
}
