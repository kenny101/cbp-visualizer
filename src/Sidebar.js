import React, { useState } from "react";
import { FiChevronLeft, FiSearch } from "react-icons/fi";

import { GoMarkGithub } from "react-icons/go";
import { Sidebar, Tab } from "./react-leaflet-sidetabs";
import "./Sidebar.css";
import TopSectors from "./TopSectors";
import YearSlider from "./YearSlider";
import SectorSelect from "./SectorSelect";
import { useMemo } from "react";

const SidebarComponent = ({
  map,
  setYear,
  setSector,
  year,
  topSectorKey,
  hoveredCounty,
  hoveredState
}) => {
  const [openTab, setOpenTab] = useState("search");
  const [currYear, setCurrYear] = useState(null);

  const onClose = () => {
    setOpenTab(false);
  };

  const onOpen = (id) => {
    setOpenTab(id);
  };

  return (
    <section className="Sidebar">
      <Sidebar
        map={map}
        position="left"
        collapsed={!openTab}
        selected={openTab}
        closeIcon={<FiChevronLeft />}
        onClose={onClose}
        onOpen={onOpen}
        panMapOnChange
        rehomeControls
      >
        <Tab id="search" header="Search" icon={<FiSearch />}>
          {useMemo(
            () => (
              <YearSlider setYear={setYear} setCurrYear={setCurrYear} />
            ),
            [setYear, setCurrYear]
          )}
          <div className="search-label">Employment Sector:</div>
          {useMemo(
            () => (
              <SectorSelect currYear={currYear} setSector={setSector} />
            ),
            [currYear]
          )}
          {/* <SectorSelect currYear={currYear} setSector={setSector} /> */}

          {useMemo(
            () => (
              <TopSectors
                year={year}
                topSectorKey={topSectorKey}
                hoveredCounty={hoveredCounty}
                hoveredState={hoveredState}
              />
            ),
            [year, topSectorKey]
          )}
        </Tab>
      </Sidebar>
    </section>
  );
};

export default SidebarComponent;
