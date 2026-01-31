export default function DailySkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-preset-5">Daily forecast</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(89.14px,1fr))] gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex h-[165px] flex-col items-center gap-4 rounded-xl border-1 border-neutral-600 bg-neutral-800 px-2.5 py-4"
          ></div>
        ))}
      </div>
    </div>
  );
}
