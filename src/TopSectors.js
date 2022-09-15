import React, { useEffect, useMemo} from "react";

import top from "./data/top_10_sectors.json";
const topSectors = JSON.parse(JSON.stringify(top));
var topSectorRender = [];


function renderTopSectors(year, topSectorKey) {
  const temp = [];

  if (year + topSectorKey in topSectors) {
    topSectors[year + topSectorKey].forEach((sector) => {
      temp.push(sector);
    });
  }
  return temp;
}

const TopSectors = ({ hoveredCounty, year, topSectorKey }) => {
  useMemo(() => {
    topSectorRender = renderTopSectors(year, topSectorKey);
  }, [topSectorKey]);

  return (
    <div className="top-sectors">
      Top 10 Sectors for {hoveredCounty} in {year}
      <ol>
        {topSectorRender.map((sector) => {
          return <li key={sector}>{sector}</li>;
        })}
      </ol>
    </div>
  );
};

export default TopSectors;
