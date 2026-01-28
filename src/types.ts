export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeatherData;
  hourly_units: HourlyUnits;
  hourly: HourlyWeatherApiData;
  daily_units: DailyUnits;
  daily: DailyWeatherData;
};

export type CurrentUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  weather_code: string;
  precipitation: string;
  wind_speed_10m: string;
};

export type HourlyUnits = {
  time: string;
  weather_code: string;
  temperature_2m: string;
};

export type DailyUnits = {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
};

export type CurrentWeatherData = {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  precipitation: number;
  wind_speed_10m: number;
};

export type HourlyWeatherApiData = {
  time: string[];
  weather_code: number[];
  temperature_2m: number[];
};

export type HourlyWeatherDataByDay = {
  day: string;
  time: string[];
  weather_code: number[];
  temperature_2m: string[];
};

export type HourlyWeatherData = HourlyWeatherDataByDay[];

export type DailyWeatherData = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export type GeolocationApiResponse = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
};

export type Geolocation = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};
