import Logo from "./assets/images/logo.svg";
import DropDownMenu from "./DropDownMenu";

import Search from "./Search";

function App() {
  return (
    <div className="min-h-dvh bg-neutral-900 p-4 md:p-6 lg:py-12">
      <div className="mx-auto flex flex-col gap-12 text-white lg:max-w-[1216px] lg:gap-16">
        <header className="flex items-center justify-between">
          <img className="h-[28px] md:h-[40px]" src={Logo} alt="Logo" />
          <DropDownMenu />
        </header>
        <div className="text-preset-2 self-center text-center md:max-w-[482px] lg:max-w-full">
          How's the sky looking today?
        </div>
        <Search />
        {/* Units Switch to Imperial/Metric Temperature Celsius (°C) Fahrenheit (°F)
      Wind Speed km/h mph Precipitation Millimeters (mm) Inches (in) How's the
      sky looking today? Search for a city, e.g., New York Search Feels like
      Humidity Wind Precipitation Daily forecast Hourly forecast */}
      </div>
    </div>
  );
}

export default App;
