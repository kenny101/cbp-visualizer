import React, { useState } from "react";
import Map from "./Map";
import Sidebar from "./Sidebar";
import "./styles.scss";
import Legend from "./Legend";


export default function App() {
  const [map, setMap] = useState(null);
  const [year, setYear] = useState(null);
  const [sector, setSector] = useState(null);
  const [topSectorKey, setTopSectorKey] = useState(null);
  const [hoveredCounty, setHoveredCounty] = useState(null);
  // const [onEachCounty, setOnEachCounty] = useState(null);
  
  return (
    <div className="App">
      {map && <Sidebar map={map} setYear={setYear} setSector={setSector} year={year} topSectorKey={topSectorKey} hoveredCounty={hoveredCounty}/>}
      <Map setMap={setMap} year={year}  sector={sector} setTopSectorKey={setTopSectorKey} setHoveredCounty={setHoveredCounty}/>
      <Legend map={map} />
    </div>
  );
}
