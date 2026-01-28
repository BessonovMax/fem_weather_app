import SearchIcon from "../assets/images/icon-search.svg";
import type { Geolocation } from "../types";
import { fetchLocation } from "../api/location";
import { useState, useRef } from "react";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Geolocation | null>>;
};

export default function Search({ setLocation }: Props) {
  const [locationList, setLocationList] = useState<Geolocation[]>([]);
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    try {
      const locations = await fetchLocation(searchQuery);
      setLocationList(locations);
      setShowList(true);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLocationList([]);
      setShowList(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (locationList.length > 0) {
        const first = locationList[0];
        setLocation({
          name: first.name,
          latitude: first.latitude,
          longitude: first.longitude,
          country: first.country,
        });
        setShowList(false);
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.blur();
        }
      }
    }
  }

  return (
    <form
      onChange={handleSearch}
      className="text-preset-5-medium flex flex-col gap-3 md:flex-row lg:w-[656px] lg:self-center"
    >
      <div className="relative flex grow-1 items-center">
        <img
          className="pointer-events-none absolute pl-6"
          src={SearchIcon}
          alt="Search"
        />
        <input
          className="w-full cursor-pointer rounded-xl bg-neutral-800 py-4 pr-4 pl-[3.75rem] text-neutral-200"
          type="search"
          name="search"
          placeholder="Search for a place..."
          onKeyDown={handleKeyDown}
          ref={inputRef}
        ></input>
        {showList && (
          <div className="absolute top-16 left-0 w-full rounded-xl bg-neutral-800 p-2">
            <ul className="flex flex-col gap-1">
              {locationList.map((location) => (
                <li
                  key={location.latitude + location.longitude}
                  className="text-preset-7 cursor-pointer rounded-lg border-1 border-neutral-800 px-2 py-2.5 hover:border-neutral-600 hover:bg-neutral-700"
                  onClick={() => {
                    setLocation({
                      name: location.name,
                      latitude: location.latitude,
                      longitude: location.longitude,
                      country: location.country,
                    });
                    setShowList(false);
                    if (inputRef.current) {
                      inputRef.current.value = "";
                      inputRef.current.blur();
                    }
                  }}
                >
                  {location.name}, {location.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="cursor-pointer rounded-xl bg-blue-500 py-4 text-center md:px-6">
        Search
      </div>
    </form>
  );
}
