import SearchIcon from "../assets/images/icon-search.svg";
import type { Geolocation } from "../types";
import { fetchLocation } from "../api/location";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import LoadingIcon from "../assets/images/icon-loading.svg";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Geolocation | null>>;
  setApiError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Search({ setLocation, setApiError }: Props) {
  const [locationList, setLocationList] = useState<Geolocation[]>([]);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<Geolocation | null>(
    null,
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    //showing loading spinner
    setShowList(true);
    setIsLoading(true);
    //removing previous searchedLocation if it was
    setSearchedLocation(null);
    setLocationError(null);
    if (inputRef.current && inputRef.current.value.length < 2) {
      setLocationList([]);
      setIsLoading(false);
      setShowList(false);
      return;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //set the location that was searched and picked by user as a location for weather fetch func (if no location was picked from the list, submit button won't do anything (double-check for no sending wrong input: this and disabled submit button))
    // close the list of location variants
    // making searchedLocation state null to disable the submit button
    if (searchedLocation) {
      setLocation(searchedLocation);
      setShowList(false);
      setSearchedLocation(null);
    }
    //make input field empty after submission
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedSearchTerm.trim().length > 1) {
        setShowList(true);
        setIsLoading(true);
        try {
          const locations = await fetchLocation(debouncedSearchTerm);
          setLocationList(locations.data);
          setHighlightedIndex(0);
        } catch (error) {
          setLocationError(
            error instanceof Error ? error.message : String(error),
          );
          if (locationError !== "No search result found!") {
            setApiError(true);
          }
          setLocationList([]);
          setShowList(false);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchLocations();
  }, [debouncedSearchTerm, locationError, setApiError]);

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

  return (
    <div className="flex flex-col gap-12">
      <form
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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          ></input>
          {showList && (
            <div className="absolute top-17 left-0 w-full rounded-xl bg-neutral-800 p-2">
              {isLoading ? (
                <div className="flex items-center gap-2.5 px-2 py-2.5">
                  <img
                    className="animate-spin"
                    src={LoadingIcon}
                    alt="Loading"
                  />
                  <span className="text-preset-7">
                    Searching in progress...
                  </span>
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
          disabled={searchedLocation === null}
          className="cursor-pointer rounded-xl bg-blue-500 py-4 text-center transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 disabled:cursor-not-allowed disabled:hover:bg-blue-500 md:px-6"
        >
          Search
        </button>
      </form>
      {locationError ? (
        <div className="text-preset-4 self-center">{locationError}</div>
      ) : null}
    </div>
  );
}
