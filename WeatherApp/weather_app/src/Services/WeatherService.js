import { DateTime } from "luxon";
const API_Key = "0b99b9b4bf24ea33f28bead8bf967c01";
//const API_Key = "edd8d6b0383e80cfd69913c3f414ff07";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParam) => {
  const url = new URL(BASE_URL + "/" + infoType);

  url.search = new URLSearchParams({ ...searchParam, appid: API_Key });

  return fetch(url).then((res) => res.json());
};

const FormateCurrentWeather = (data) => {
    //console.log("data-->",data)
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { description, icon } = weather[0];
  //console.log("weather--->>>",description)

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    description,
    icon,
    speed,
  };
};

const format_forcast_weather = (data) => {
  let { timezone, daily, hourly } = data;
   console.log("daily",daily)
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

export const formateData = async (searchParam) => {
  const FormateWeather = await getWeatherData("weather", searchParam).then(
    FormateCurrentWeather
  );

  const { lat, lon } = FormateWeather;

  const Formated_Forcast_Weather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParam.units,
  }).then(format_forcast_weather);
  return { ...FormateWeather, ...Formated_Forcast_Weather };
};

export const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time : 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const iconUrlFromCode = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`