import type { GeolocationApiResponse } from "../types";

type GeolocationApiResult = {
  data: GeolocationApiResponse[];
  status: number;
};

export async function fetchLocation(
  name: string,
): Promise<GeolocationApiResult> {
  const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`;
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }
  const data: { results: GeolocationApiResponse[] } = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No search result found!");
  }

  return {
    data: data.results.slice(0, 4),
    status: response.status,
  };
}
