import { useEffect, useState } from "react";
import L from "leaflet";
import "./Legend.css";
import axios from "axios";

var div = L.DomUtil.create("div", "info legend");
var quantilesMap = new Map();

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
    if (year === null || sector === null) {
      return;
    }

    const key = String(year + " " + sector);

    if (quantilesMap.has(key)) {
      setGrades(quantilesMap.get(key));
      div.innerHTML = "";
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i] + 1, grades) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return;
    } else {
      const options = {
        method: "GET",
        // url: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api" + "/quantiles",
        url: "http://localhost:8080/api" + "/quantiles",
        params: { Year: year, Sector: sector },
      };

      axios
        .request(options)
        .then((response) => {
          response.data.forEach((datum) => {
            quantilesMap.set(
              datum["Year"] + " " + datum["Sector"],
              datum["Quantiles"]
            );
            if (quantilesMap.has(key)) {
              setGrades(quantilesMap.get(key));
              div.innerHTML = "";
              for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                  '<i style="background:' +
                  getColor(grades[i] + 1, grades) +
                  '"></i> ' +
                  grades[i] +
                  (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
              }
            } else {
            }
          });
        })
        .catch((error) => {
          console.error(
            "Error: No Data avaliable for year " +
              year +
              " and sector " +
              sector
          );
        });
    }
  }, [year, sector, grades]);
  return null;
}

export default Legend;
