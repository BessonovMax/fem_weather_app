import CurrentSkeleton from "./CurrentSkeleton";
import DailySkeleton from "./DailySkeleton";
import HourlySkeleton from "./HourlySkeleton";

export default function MainSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-8 lg:w-[800px] lg:gap-12">
        <div className="flex flex-col gap-5 lg:gap-8">
          <CurrentSkeleton />
        </div>
        <DailySkeleton />
      </div>
      <HourlySkeleton />
    </>
  );
}
