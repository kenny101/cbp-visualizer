import { useEffect, useState } from "react";
import L from "leaflet";
import "./Legend.css";
import Q from "./data/employment_quantiles.json";

const quantiles = JSON.parse(JSON.stringify(Q));
var div = L.DomUtil.create("div", "info legend");

function getColor(d, grades) {
  return d > grades[7]
    ? "#800026"
    : d > grades[6]
    ? "#BD0026"
    : d > grades[5]
    ? "#E31A1C"
    : d > grades[4]
    ? "#FC4E2A"
    : d > grades[3]
    ? "#FD8D3C"
    : d > grades[2]
    ? "#FEB24C"
    : d > grades[1]
    ? "#FED976"
    : "#FFEDA0";
}

function Legend({ map, year, sector, grades, setGrades }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomright" });
      legend.onAdd = () => {
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 1, grades) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);

  useEffect(() => {
    const key = year + " " + sector;
    if (key in quantiles) {
      setGrades(quantiles[key]);
      div.innerHTML = "";
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i] + 1,grades) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
    } else {
    }
  }, [year, sector, grades]);
  return null;
}

export default Legend;
