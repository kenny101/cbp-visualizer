import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, ScaleControl, GeoJSON } from "react-leaflet";
import axios from "axios";

import mapData from "./data/counties.json";
import worldData from "./data/worldOutline.json";
import stateMappings from "./data/stateMappings.json";

const stateMap = JSON.parse(JSON.stringify(stateMappings));
const countyLayers = [];

var employmentDataMap = new Map();
var val = null;
var percentage = null;

const defaultLayerStyle = {
  fillOpacity: 0.2,
  weight: 0.5,
};

const onHoverStyle = {
  weight: 2,
  fillOpacity: 0.5,
};


const onEachCountyLayers = (year, sector, grades) => {
  const key = year + " " + sector;

  // fetch data from server and render popups if data is not in map
  if (!employmentDataMap.has(year + " " + sector)) {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/employment-data",
      params: { Year: year, Sector: sector },
    };
    const countyStateMap = new Map();
    employmentDataMap.set(String(year + " " + sector), countyStateMap);
    axios
      .request(options)
      .then((response) => {
        const employment = response.data.Employment;
        employment.forEach((entry) => {
          const key = String(entry.County + ", " + entry.State);
          countyStateMap.set(key, [entry.Value, entry.Percent]);
        });
        var innerMap = employmentDataMap.get(key);

        countyLayers.forEach((countyLayer) => {
          const layer = countyLayer[0];
          const county = countyLayer[1];
          const countyName = county.properties.NAME;
          const stateName = county.properties.STATE;
          const countyStateKey = String(
            countyName + ", " + stateMap[stateName]
          );

          if (employmentDataMap.has(key)) {
            if (innerMap.has(countyStateKey)) {
              val = employmentDataMap.get(key).get(countyStateKey)[0];
              percentage = employmentDataMap.get(key).get(countyStateKey)[1];
            } else {
              val = 0;
              percentage = 0;
            }
          } else {
            console.log("key not found");
          }

          layer.setStyle({
            fillColor: getColor(parseInt(val), grades),
          });
          layer.bindPopup(
            "<p>State: " +
              stateMap[stateName] +
              " <br>County: " +
              countyName +
              " <br>Employment: " +
              val +
              " <br>Employment Percentage: " +
              percentage +
              "</p>",
            { closeButton: false }
          );
          layer.on("mouseover", function (e) {
            layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
          });
          layer.on("mouseout", function (e) {
            layer.closePopup(layer.setStyle(defaultLayerStyle));
          });
        });
      })
      .catch((error) => {
        console.error(
          "Error: No Data avaliable for year " + year + " and sector " + sector
        );
      });
  } else {
    // Data already exists in cache, retrieve popup data
    countyLayers.forEach((countyLayer) => {
      const layer = countyLayer[0];
      const county = countyLayer[1];
      const countyName = county.properties.NAME;
      const stateName = county.properties.STATE;
      const countyStateKey = String(countyName + ", " + stateMap[stateName]);
      var innerMap = employmentDataMap.get(key);
      if (employmentDataMap.has(key)) {
        if (innerMap.has(countyStateKey)) {
          val = employmentDataMap.get(key).get(countyStateKey)[0];
          percentage = employmentDataMap.get(key).get(countyStateKey)[1];
        } else {
          val = 0;
          percentage = 0;
        }
      } else {
        console.log("key not found");
      }

      layer.setStyle({
        fillColor: getColor(parseInt(val), grades),
      });
      layer.bindPopup(
        "<p>State: " +
          stateMap[stateName] +
          " <br>County: " +
          countyName +
          " <br>Employment: " +
          val +
          " <br>Employment Percentage: " +
          percentage +
          "</p>",
        { closeButton: false }
      );
      layer.on("mouseover", function (e) {
        layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
      });
      layer.on("mouseout", function (e) {
        layer.closePopup(layer.setStyle(defaultLayerStyle));
      });
    });
  }
};

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

const renderedMap = ({
  setMap,
  year,
  sector,
  setTopSectorKey,
  setHoveredCounty,
  grades,
  csvRows,
}) => {
  useEffect(() => {
    if (year !== null && sector !== null) {
      onEachCountyLayers(year, sector, grades, csvRows);
    }
  }, [year, sector]);

  // Intialize map data
  const map = useMemo(() => {
    const onEachCounty = (county, layer) => {
      const countyName = county.properties.NAME;
      const stateName = county.properties.STATE;
      countyLayers.push([layer, county]);
      layer.bindPopup(
        "<p>State: " +
          stateMap[stateName] +
          " <br>County: " +
          countyName +
          " <br>Employment: " +
          val +
          " <br>Employment Percentage: " +
          percentage +
          "</p>",
        { closeButton: false }
      );

      layer.on("mouseover", function (e) {
        layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
        const key = " " + countyName + ", " + stateMap[stateName];
        setTopSectorKey(key);
        setHoveredCounty(countyName);
      });

      layer.on("mouseout", function (e) {
        layer.closePopup(layer.setStyle(defaultLayerStyle));
      });
    };

    const countyStyle = {
      fillColor: "blue",
      fillOapcity: 0.5,
      color: "black",
      weight: 0.5,
    };

    const worldStyle = {
      fillColor: "grey",
      fillOapcity: 0.3,
      color: "black",
      weight: 0,
    };

    return (
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        center={{ lat: 38, lng: -95 }}
        style={{ height: "100vh" }}
        zoom={5}
        whenCreated={setMap}
      >
        <ScaleControl />
        <GeoJSON style={worldStyle} data={worldData.features}></GeoJSON>

        <GeoJSON
          style={countyStyle}
          data={mapData.features}
          onEachFeature={onEachCounty}
        ></GeoJSON>
      </MapContainer>
    );
  }, []);

  return map;
};

export default renderedMap;
