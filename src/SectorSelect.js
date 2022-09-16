import React, { useState } from "react";

import Sectors from "./data/sectors.json";
import AsyncSelect from "react-select/async";
import { useEffect } from "react";

const sectorOptions = JSON.parse(JSON.stringify(Sectors));



const SectorSelect = ({ currYear, setSector}) => {
  const [currInput, setCurrInput] = useState(null);

  const loadOptions = (inputValue, callback) => {
    // console.log("called");
    setTimeout(() => {
      if (Array.isArray(sectorOptions[currYear])) {
        const filteredOptions = sectorOptions[currYear].filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        callback(filteredOptions);
      }
    }, 2000);
  };

  const SectorDropdown = () => (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={handleSectorChange}
      defaultOptions
      value={currInput}
    />
  );
    
  useEffect (() => {
  }, [setSector]);

  const handleSectorChange = (selectedOption) => {
    setCurrInput(selectedOption);
    setSector(selectedOption.value);
  };

  return (
    <div className="search-label">
      <SectorDropdown />
    </div>
  );
};

export default SectorSelect;
