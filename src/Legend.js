import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomright" });
      legend.onAdd = () => {

        var div = L.DomUtil.create("div", "info legend"),
          grades = [0, 10, 20, 50, 100, 200, 500, 1000],
          labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 1) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;