"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import Map from "@/components/Map"; // আমরা Map component modify করব
import countries from "world-countries";

// TypeScript friendly type
interface CountryOption {
  value: string;
  label: string;
  countryData: any;
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]); // default London
  const [popupText, setPopupText] = useState<string>("London Location");

  // Prepare options for react-select
  const options: CountryOption[] = countries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
    countryData: country,
  }));

  // When country changes
  const handleChange = (option: CountryOption | null) => {
    setSelectedCountry(option);

    if (option && option.countryData.latlng) {
      const [lat, lng] = option.countryData.latlng;
      setMapPosition([lat, lng]);
      setPopupText(option.countryData.name.common);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-full min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      {/* Search Bar
      <div className="w-[300px]">
        <Select
          options={options}
          onChange={handleChange}
          placeholder="Search country..."
          isClearable
        />
      </div> */}

      {/* <Map
        position={mapPosition}
        zoom={4} // adjust zoom for country view
        popupText={popupText}
      /> */}
    </div>
  );
}
