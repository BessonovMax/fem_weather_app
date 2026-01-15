import Logo from "./assets/images/logo.svg";
import DropDownMenu from "./DropDownMenu";
import Sun from "./assets/images/icon-sunny.webp";
import Search from "./Search";
import CurrentDetails from "./CurrentDetails";
import DailyDetails from "./DailyDetails";
import DropDownIcon from "./assets/images/icon-dropdown.svg";
import HourlyDetails from "./HourlyDetails";

function App() {
  return (
    <div className="min-h-dvh bg-neutral-900 p-4 md:p-6 lg:py-12">
      <div className="mx-auto flex flex-col gap-12 text-white lg:max-w-[1216px] lg:gap-16">
        <header className="flex items-center justify-between">
          <img className="h-[28px] md:h-[40px]" src={Logo} alt="Logo" />
          <DropDownMenu />
        </header>
        <h1 className="text-preset-2 self-center text-center md:max-w-[482px] lg:max-w-full">
          How's the sky looking today?
        </h1>
        <Search />

        <main className="grid gap-8 lg:grid-cols-[800px_1fr]">
          <div className="flex flex-col gap-8 lg:w-[800px] lg:gap-12">
            <div className="flex flex-col gap-5 lg:gap-8">
              <div className="flex flex-col gap-4 rounded-[20px] bg-[url(./images/bg-today-small.svg)] bg-cover py-[41px] md:flex-row md:justify-between md:bg-[url(./images/bg-today-large.svg)] md:px-6 md:py-[83px]">
                <div className="flex flex-col items-center gap-3 md:items-start md:justify-center">
                  <h2 className="text-preset-4">Berlin, Germany</h2>
                  <div className="text-preset-6 text-white/80">
                    Tuesday, Aug 5, 2025
                  </div>
                </div>
                <div>
                  <div
                    className="flex items-center justify-center gap-5"
                    rounded-xl
                  >
                    <img className="w-[120px]" src={Sun} alt="Weather icon" />
                    <div className="text-preset-1">20°</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(163.5px,1fr))] gap-4 md:gap-5 lg:gap-6">
                <CurrentDetails detail="Feels Like" value="18°" />
                <CurrentDetails detail="Humidity" value="46%" />
                <CurrentDetails detail="Wind" value="14 km/h" />
                <CurrentDetails detail="Precipitation" value="0 mm" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-preset-5">Daily forecast</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(89.14px,1fr))] gap-4">
                <DailyDetails />
                <DailyDetails />
                <DailyDetails />
                <DailyDetails />
                <DailyDetails />
                <DailyDetails />
                <DailyDetails />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 px-4 py-5 md:p-6">
            <div className="flex items-center justify-between">
              <div className="text-preset-5">Hourly forecast</div>
              <div className="flex items-center gap-3 rounded-lg bg-neutral-600 px-4 py-2">
                <div className="text-preset-7">Tuesday</div>

                <img className="w-[12px]" src={DropDownIcon} alt="Menu" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <HourlyDetails />
              <HourlyDetails />
              <HourlyDetails />
              <HourlyDetails />
              <HourlyDetails />
              <HourlyDetails />
              <HourlyDetails />
              <HourlyDetails />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

{
  /* Units Switch to Imperial/Metric Temperature Celsius (°C) Fahrenheit (°F)
      Wind Speed km/h mph Precipitation Millimeters (mm) Inches (in) How's the
      sky looking today? Search for a city, e.g., New York Search Feels like
      Humidity Wind Precipitation Daily forecast Hourly forecast */
}
