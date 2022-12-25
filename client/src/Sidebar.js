import React, { useState } from "react";
import { FiChevronLeft, FiSearch, FiHelpCircle } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";

import { Sidebar, Tab } from "./react-leaflet-sidetabs";
import "./Sidebar.css";
import TopSectors from "./TopSectors";
import YearSlider from "./YearSlider";
import SectorSelect from "./SectorSelect";
import ExportBtn from "./ExportBtn";
import { useMemo } from "react";
import Tooltip from "./Tooltip";

const SidebarComponent = ({
  map,
  setYear,
  setSector,
  year,
  topSectorKey,
  hoveredCounty,
  hoveredState,
  csvRows,
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
        csvRows={csvRows}
        panMapOnChange
        rehomeControls
      >
        <Tab id="search" header="Search" icon={<FiSearch />}>
          <div className="search-label">
            Year:
            <Tooltip
              content="Displays county data for the selected year."
              direction="right"
            >
              <BsInfoCircle
                style={{
                  marginLeft: "5px",
                }}
              />
            </Tooltip>
          </div>
          {useMemo(
            () => (
              <YearSlider setYear={setYear} setCurrYear={setCurrYear} />
            ),
            [setYear, setCurrYear]
          )}
          <div className="search-label">
            Employment Sector:
            <Tooltip
              content="Displays county data for the selected sector."
              direction="bottom"
            >
              <BsInfoCircle
                style={{
                  marginLeft: "5px",
                }}
              />
            </Tooltip>
          </div>
          {useMemo(
            () => (
              <SectorSelect currYear={currYear} setSector={setSector} />
            ),
            [currYear]
          )}

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
          <ExportBtn year={year} />
        </Tab>
      </Sidebar>
    </section>
  );
};

export default SidebarComponent;
