import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopButtons from "./Components/TopButtons";
import Input from "./Components/Input";
import TimeAndLocation from "./Components/TimeAndLocation";
import TempAndDetail from "./Components/TempAndDetail";
import Forcast from "./Components/Forcast";
import { formateData } from "./Services/WeatherService";
const App = () => {
  const [query, setquery] = useState({ q: "Azamgarh" });
  const [units, setunits] = useState("metric");
  const [weather, setweather] = useState(null);

  useEffect(() => {
    const message = query.q ? query.q : "current location.";

    toast.info("Fetching weather for " + message);
    const fetchWeather = async () => {
      await formateData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setweather(data);
      });
    };
    fetchWeather();
  }, [query, units]);
  const backgroundChange = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${backgroundChange()} sm:w-screen`}
    >
      <TopButtons setquery={setquery} />
      <Input setquery={setquery} units={units} setunits={setunits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TempAndDetail weather={weather} />
          <Forcast title="hourly forcaste" items={weather.hourly} />
          <Forcast title="Daily forcaste" items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
};

export default App;
