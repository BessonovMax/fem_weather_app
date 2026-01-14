import IconUnits from "./assets/images/icon-units.svg";
import DropDownIcon from "./assets/images/icon-dropdown.svg";

export default function DropDownMenu() {
  return (
    <div className="text-preset-8 md:text-preset-7 flex cursor-pointer gap-1.5 rounded-md bg-neutral-800 px-2.5 py-2">
      <img className="w-[14px] md:w-[16px]" src={IconUnits} alt="Units" />
      Units
      <img
        className="w-[9px] md:w-[12px]"
        src={DropDownIcon}
        alt="Drop down menu"
      />
    </div>
  );
}
