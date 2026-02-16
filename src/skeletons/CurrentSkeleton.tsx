import LoadingDots from "../assets/images/icon-loading-dots.svg";

export default function CurrentSkeleton() {
  return (
    <>
      <div className="text-preset-6 flex h-[286px] flex-col items-center justify-center gap-3.5 rounded-[20px] bg-neutral-800 bg-[url(/fem_weather_app/images/bg-loading-large.svg)] bg-contain text-neutral-200">
        <img src={LoadingDots} alt="Loading " className="animate-spin-x" />
        <div>Loading</div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(163.5px,1fr))] gap-4 md:gap-5 lg:gap-6">
        <div className="flex flex-col gap-6 rounded-xl border-1 border-neutral-600 bg-neutral-800 p-5">
          <div className="text-preset-6 text-neutral-200">Feels Like</div>
          <div className="text-preset-3">—</div>
        </div>
        <div className="flex flex-col gap-6 rounded-xl border-1 border-neutral-600 bg-neutral-800 p-5">
          <div className="text-preset-6 text-neutral-200">Feels Like</div>
          <div className="text-preset-3">—</div>
        </div>
        <div className="flex flex-col gap-6 rounded-xl border-1 border-neutral-600 bg-neutral-800 p-5">
          <div className="text-preset-6 text-neutral-200">Feels Like</div>
          <div className="text-preset-3">—</div>
        </div>
        <div className="flex flex-col gap-6 rounded-xl border-1 border-neutral-600 bg-neutral-800 p-5">
          <div className="text-preset-6 text-neutral-200">Feels Like</div>
          <div className="text-preset-3">—</div>
        </div>
      </div>
    </>
  );
}
