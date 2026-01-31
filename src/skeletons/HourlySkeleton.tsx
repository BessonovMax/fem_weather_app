import DropDownIcon from "../assets/images/icon-dropdown.svg";

export default function HourlySkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 py-5 md:py-6">
      <div className="flex items-center justify-between px-4 md:px-6">
        <div className="text-preset-5">Hourly forecast</div>
        <button className="relative flex cursor-pointer items-center gap-3 rounded-lg bg-neutral-600 px-4 py-2">
          <div className="text-preset-7">—</div>
          <img className="w-[12px]" src={DropDownIcon} alt="Menu" />
        </button>
      </div>
      <div className="scrollbar-thin flex max-h-[592px] flex-col gap-4 overflow-y-auto px-4 md:px-6">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[60px] rounded-lg border-1 border-neutral-600 bg-neutral-700"
          ></div>
        ))}
      </div>
    </div>
  );
}
