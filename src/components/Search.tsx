import SearchIcon from "../assets/images/icon-search.svg";
import type { Geolocation } from "../types";
import { fetchLocation } from "../api/location";
import { useState, useRef } from "react";
import LoadingIcon from "../assets/images/icon-loading.svg";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Geolocation | null>>;
};

export default function Search({ setLocation }: Props) {
  const [locationList, setLocationList] = useState<Geolocation[]>([]);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<Geolocation | null>(
    null,
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    setIsLoading(true);
    try {
      if (searchQuery.trim().length <= 1) {
        setLocationList([]);
        setShowList(false);
        return;
      }
      if (searchQuery.trim().length > 1) {
        const locations = await fetchLocation(searchQuery);
        setLocationList(locations.data);
        setShowList(true);
        setHighlightedIndex(0);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLocationList([]);
      setShowList(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList || locationList.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < locationList.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter": {
        event.preventDefault();
        const selected = locationList[highlightedIndex];
        if (selected) {
          setSearchedLocation(selected);
          if (inputRef.current) {
            inputRef.current.value = `${selected.name}, ${selected.country}`;
          }
          setShowList(false);
        }
        break;
      }
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchedLocation) {
      setLocation(searchedLocation);
      setShowList(false);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <form
      onChange={handleSearch}
      onSubmit={handleSubmit}
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
          <div className="absolute top-17 left-0 w-full rounded-xl bg-neutral-800 p-2">
            {isLoading ? (
              <div className="flex items-center gap-2.5 px-2 py-2.5">
                <img className="animate-spin" src={LoadingIcon} alt="Loading" />
                <span className="text-preset-7">Searching in progress...</span>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {locationList.map((location, index) => (
                  <li
                    key={location.latitude + location.longitude}
                    className={`text-preset-7 cursor-pointer rounded-lg border-1 px-2 py-2.5 ${index === highlightedIndex ? "border-neutral-600 bg-neutral-700" : "border-neutral-800 hover:border-neutral-600 hover:bg-neutral-700"}`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => {
                      const selected = locationList[index];

                      setSearchedLocation(selected);

                      if (inputRef.current) {
                        inputRef.current.value = `${selected.name}, ${selected.country}`;
                      }

                      setShowList(false);
                    }}
                  >
                    {location.name}, {location.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-xl bg-blue-500 py-4 text-center transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 md:px-6"
      >
        Search
      </button>
    </form>
  );
}
