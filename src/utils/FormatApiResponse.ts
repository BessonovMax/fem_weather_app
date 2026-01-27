import type {
  HourlyWeatherApiData,
  HourlyWeatherData,
  HourlyWeatherDataByDay,
} from "../types";

export function formatApiResponseDate(apiResponse: string) {
  const dateObject = new Date(apiResponse);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  const dayOfMonth = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
}

export function formatDailyApiResponseDate(apiResponse: string) {
  const dateObject = new Date(apiResponse);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  return dayOfWeek;
}

export function formatHourlyApiResponseDate(apiResponse: string) {
  const dateObject = new Date(apiResponse);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  return dayOfWeek;
}

function formatHourlyApiResponseTime(apiResponse: string | undefined): string {
  if (!apiResponse) return "N/A";
  const dateObject = new Date(apiResponse);
  const hours = dateObject.getHours();
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours} ${period}`;
}

export function formatHourlyWeatherData(apiResponse: HourlyWeatherApiData) {
  const HOURSINDAY = 24;
  const numberOfDays = apiResponse.time.length / HOURSINDAY;
  const formattedHourlyData: HourlyWeatherData = [];

  for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
    const dayData: HourlyWeatherDataByDay = {
      day: formatHourlyApiResponseDate(apiResponse.time[dayIndex * HOURSINDAY]),
      time: [],
      weather_code: [],
      temperature_2m: [],
    };

    for (let hourIndex = 0; hourIndex < HOURSINDAY; hourIndex++) {
      const index = dayIndex * HOURSINDAY + hourIndex;
      dayData.time.push(formatHourlyApiResponseTime(apiResponse.time[index]));
      dayData.weather_code.push(apiResponse.weather_code[index]);
      dayData.temperature_2m.push(apiResponse.temperature_2m[index].toFixed());
    }

    formattedHourlyData.push(dayData);
  }

  return formattedHourlyData;
}
