type Props = {
  detail: string;
  value: string;
};

export default function CurrentDetails(props: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border-1 border-neutral-600 bg-neutral-800 p-5">
      <div className="text-preset-6 text-neutral-200">{props.detail}</div>
      <div className="text-preset-3">{props.value}</div>
    </div>
  );
}
