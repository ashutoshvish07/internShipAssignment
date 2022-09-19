import React, { useState } from "react";
import { toast } from "react-toastify";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
const Input = ({ setquery, units, setunits }) => {
  const [city, setcity] = useState("");
  const handleClick = () => {
    if (city !== "") setquery({ q: city });
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setquery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnits = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setunits(selectedUnit);
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setcity(e.target.value)}
          type="text"
          placeholder="search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          onClick={handleClick}
          size={30}
          className="text-white cursor-pointer transition ease-out hover:scale-150"
        />
        <UilLocationPoint
          size={30}
          className="text-white cursor-pointer transition ease-out hover:scale-150"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          onClick={handleUnits}
          size={30}
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-150"
        >
          &#8451;
        </button>
        <p className="text-xl text-white mx-1"> |</p>
        <button
          onClick={handleUnits}
          size={30}
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-150"
        >
          &#8457;
        </button>
      </div>
    </div>
  );
};

export default Input;
