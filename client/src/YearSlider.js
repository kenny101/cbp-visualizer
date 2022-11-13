import React from "react";
import ReactSlider from "react-slider";

const YearSlider = ({ setYear, setCurrYear }) => {
  const handleSliderChange = (value) => {
    setYear(value);
    if (value >= 2012 && value <= 2016) {
      setCurrYear("2012-2016");
    }
    // 2008-2011
    else if (value >= 2008 && value <= 2011) {
      setCurrYear("2008-2011");
    }
    // 2003-2007
    else if (value >= 2003 && value <= 2007) {
      setCurrYear("2003-2007");
    }
    // 1998-2002
    else if (value >= 1998 && value <= 2002) {
      setCurrYear("1998-2002");
    }
    // 1988-1997
    else if (value >= 1988 && value <= 1997) {
      setCurrYear("1988-1997");
    }
    // 1986-1987
    else if (value >= 1986 && value <= 1987) {
      setCurrYear("1986-1987");
    } else {
      // console.log("unexpected value");
    }
  };

  return (
    <div className="search-label">
      Year:
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        min={1975}
        max={2016}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default YearSlider;
