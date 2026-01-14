import Logo from "./assets/images/logo.svg";
import SearchIcon from "./assets/images/icon-search.svg";
import IconUnits from "./assets/images/icon-units.svg";
import DropDownIcon from "./assets/images/icon-dropdown.svg";

function App() {
  return (
    <div className="flex min-h-dvh flex-col gap-12 bg-neutral-900 p-4 text-white">
      <header className="flex items-center justify-between">
        <img className="h-[28px]" src={Logo} alt="Logo" />
        <div className="text-preset-8 md:text-preset-7 flex cursor-pointer gap-1.5 rounded-md bg-neutral-800 px-2.5 py-2">
          <img className="w-[14px] md:w-[16px]" src={IconUnits} alt="Units" />
          Units
          <img
            className="w-[9px] md:w-[12px]"
            src={DropDownIcon}
            alt="Drop down menu"
          />
        </div>
      </header>
      <div className="text-preset-2 text-center">
        How's the sky looking today?
      </div>
      <form className="text-preset-5 flex flex-col gap-3">
        <div className="relative flex items-center">
          <img
            className="pointer-events-none absolute pl-6"
            src={SearchIcon}
            alt="Search"
          />
          <input
            className="w-full cursor-pointer rounded-xl bg-neutral-800 py-4 pr-4 pl-[3.75rem] text-neutral-200"
            type="search"
            placeholder="Search for a place..."
          ></input>
        </div>
        <div className="cursor-pointer rounded-xl bg-blue-500 py-4 text-center">
          Search
        </div>
      </form>
      {/* Units Switch to Imperial/Metric Temperature Celsius (°C) Fahrenheit (°F)
      Wind Speed km/h mph Precipitation Millimeters (mm) Inches (in) How's the
      sky looking today? Search for a city, e.g., New York Search Feels like
      Humidity Wind Precipitation Daily forecast Hourly forecast */}
    </div>
  );
}

export default App;
