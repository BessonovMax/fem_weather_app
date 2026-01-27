import IconUnits from "../assets/images/icon-units.svg";
import DropDownIcon from "../assets/images/icon-dropdown.svg";
import { useState } from "react";
import MenuItem from "./MenuItem";

type Props = {
  measurementUnit: "Metric" | "Imperial";
  setMesurementUnit: React.Dispatch<
    React.SetStateAction<"Metric" | "Imperial">
  >;
};

export default function DropDownMenu({
  measurementUnit,
  setMesurementUnit,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isMetric = measurementUnit === "Metric";

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-preset-8 md:text-preset-7 flex cursor-pointer gap-1.5 rounded-md bg-neutral-800 px-2.5 py-2"
      >
        <img className="w-[14px] md:w-[16px]" src={IconUnits} alt="Units" />
        Units
        <img
          className={`w-[9px] md:w-[12px] ${showMenu ? "rotate-180 transition duration-75" : "transition duration-75"}`}
          src={DropDownIcon}
          alt="Drop down menu"
        />
      </button>
      <div>
        {showMenu && (
          <div className="absolute top-10 right-0 z-10 flex min-w-[214px] flex-col gap-1 rounded-xl border-1 border-neutral-600 bg-neutral-800 px-2 py-1.5 drop-shadow-lg">
            <button
              className={`text-preset-7 cursor-pointer rounded-lg px-2 py-2.5 text-start hover:bg-neutral-700`}
              onClick={() =>
                setMesurementUnit(
                  measurementUnit === "Metric" ? "Imperial" : "Metric",
                )
              }
            >
              Switch to {measurementUnit === "Metric" ? "Imperial" : "Metric"}
            </button>
            <div className="flex flex-col gap-2">
              <h3 className="text-preset-8 pt-1.5 pl-2 text-neutral-300">
                Temperature
              </h3>
              <div className="flex flex-col gap-1">
                <MenuItem active={isMetric} label="Celsius (°C)" />
                <MenuItem active={!isMetric} label="Fahrenheit (°F)" />

                <div className="border-1 border-neutral-600"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-preset-8 pt-1.5 pl-2 text-neutral-300">
                Wind Speed
              </h3>
              <div className="flex flex-col gap-1">
                <MenuItem active={isMetric} label="km/h" />
                <MenuItem active={!isMetric} label="mph" />
                <div className="border-1 border-neutral-600"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-preset-8 pt-1.5 pl-2 text-neutral-300">
                Precipitation
              </h3>
              <div className="flex flex-col gap-1">
                <MenuItem active={isMetric} label="Millimeters (mm)" />
                <MenuItem active={!isMetric} label="Inches (in)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
