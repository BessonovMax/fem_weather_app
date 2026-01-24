import IconSun from "../assets/images/icon-sunny.webp";
import IconDrizzle from "../assets/images/icon-drizzle.webp";
import IconRain from "../assets/images/icon-rain.webp";
import IconSnow from "../assets/images/icon-snow.webp";
import IconStorm from "../assets/images/icon-storm.webp";
import IconFog from "../assets/images/icon-fog.webp";
import IconCloudy from "../assets/images/icon-overcast.webp";
import IconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";

export default function weatherCodeToIcon(weatherCode: number): string {
  switch (weatherCode) {
    case 0:
      return IconSun;
    case 1:
      return IconPartlyCloudy;
    case 2:
      return IconPartlyCloudy;
    case 3:
      return IconCloudy;
    case 45:
    case 48:
      return IconFog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return IconDrizzle;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return IconRain;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return IconSnow;
    case 95:
    case 96:
    case 99:
      return IconStorm;
    // Add more cases for different weather codes and their corresponding icons
    default:
      return IconSun; // Default icon
  }
}
