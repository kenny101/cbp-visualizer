import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  LayersControl,
  FeatureGroup,
  Marker,
  GeoJSON,
} from "react-leaflet";

import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";

import mapData from "./data/counties.json";
import worldData from "./data/worldOutline.json";
import stateMappings from "./data/stateMappings.json";
import yearSectorMapping from "./data/yearSectorMapping.json";

const stateMap = JSON.parse(JSON.stringify(stateMappings));
const yearSectorMap = JSON.parse(JSON.stringify(yearSectorMapping));
const countyLayers = [];
var val = null;

const defaultLayerStyle = {
  fillOpacity: 0.2,
  weight: 0.5,
};

const onHoverStyle = {
  weight: 2,
  fillOpacity: 0.5,
};

const onEachCountyLayers = (year, sector, grades) => {
  countyLayers.forEach((countyLayer) => {
    if (year !== null && sector !== null) {
      const layer = countyLayer[0];
      const county = countyLayer[1];
      const countyName = county.properties.NAME;
      const stateName = county.properties.STATE;
      const key = year + " " + sector;
      const countyStateKey = countyName + ", " + stateMap[stateName];
      if (key in yearSectorMap) {
        if (countyStateKey in yearSectorMap[key]) {
          val = yearSectorMap[key][countyStateKey];
        } else {
          val = 0;
        }
      } else {
        return;
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
          "</p>",
        { closeButton: false }
      );
      layer.on("mouseover", function (e) {
        layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
      });

      layer.on("mouseout", function (e) {
        layer.closePopup(layer.setStyle(defaultLayerStyle));
      });
    }
  });
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

const Map = ({ setMap, year, sector, setTopSectorKey, setHoveredCounty, grades }) => {
  useMemo(() => {
    onEachCountyLayers(year, sector, grades);
  }, [year, sector]);

  const map = useMemo(() => {
    const onEachCounty = (county, layer) => {
      const countyName = county.properties.NAME;
      const stateName = county.properties.STATE;

      if (year !== null && sector !== null) {
      } else {
        countyLayers.push([layer, county]);

        layer.bindPopup(
          "<p>State: " +
            stateMap[stateName] +
            " <br>County: " +
            countyName +
            " <br>Employment: N/A</p>",
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
      }
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

export default Map;
