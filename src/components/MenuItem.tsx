import CheckmarkIcon from "../assets/images/icon-checkmark.svg";

type Props = {
  active: boolean;
  label: string;
};

export default function MenuItem({ active, label }: Props) {
  return (
    <div
      className={`text-preset-7 ${active ? "bg-neutral-700" : ""} flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-neutral-700`}
    >
      <span>{label}</span>
      {active && <img src={CheckmarkIcon} alt="active" />}
    </div>
  );
}
