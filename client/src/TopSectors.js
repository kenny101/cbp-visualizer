import React, { useEffect } from "react";
import axios from "axios";

var topSectorRender = [];
var topSectorsMap = new Map();

function renderTopSectors(year, topSectorKey) {
  if (year === null || topSectorKey === null) {
    return [];
  }
  const temp = [];
  if (year + topSectorKey in topSectorsMap) {
    topSectorsMap[year + topSectorKey].forEach((sector) => {
      temp.push(sector);
    });
  }
  return temp;
}

const getTopSectors = (year) => {
  if (year === null) {
    return;
  }
  const options = {
    method: "GET",
    // url: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/top-sectors",
    url: "http://localhost:8080/api/top-sectors",
    params: { Year: year },
  };

  axios
    .request(options)
    .then((response) => {
      response.data.forEach((datum) => {
        topSectorsMap[datum["Year"] + " " + datum["County"]] =
          datum["Top Sectors"];
      });
    })
    .catch((error) => {
      console.error("Error: No Data avaliable for year " + year);
    });
};

const TopSectors = ({ hoveredCounty, year, topSectorKey }) => {
  useEffect(() => {
    topSectorRender = renderTopSectors(year, topSectorKey);
  }, [hoveredCounty]);

  useEffect(() => {
    getTopSectors(year);
  }, [year]);

  return (
    <div className="top-sectors">
      <br></br>
      Top 10 Sectors for {hoveredCounty} in {year}:
      <ol>
        {topSectorRender.map((sector) => {
          return <li key={sector}>{sector}</li>;
        })}
      </ol>
    </div>
  );
};

export default TopSectors;
