import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: 1987, label: 1987 },
  { value: 1988, label: 1988 },
  { value: 1989, label: 1989 },
  { value: 1990, label: 1990 },
  { value: 1991, label: 1991 },
  { value: 1992, label: 1992 },
  { value: 1993, label: 1993 },
  { value: 1994, label: 1994 },
  { value: 1995, label: 1995 },
  { value: 1996, label: 1996 },
  { value: 1997, label: 1997 },
  { value: 1998, label: 1998 },
  { value: 1999, label: 1999 },
  { value: 2000, label: 2000 },
  { value: 2001, label: 2001 },
  { value: 2002, label: 2002 },
  { value: 2003, label: 2003 },
  { value: 2004, label: 2004 },
  { value: 2005, label: 2005 },
  { value: 2006, label: 2006 },
  { value: 2007, label: 2007 },
  { value: 2008, label: 2008 },
  { value: 2009, label: 2009 },
  { value: 2010, label: 2010 },
  { value: 2011, label: 2011 },
  { value: 2012, label: 2012 },
  { value: 2013, label: 2013 },
  { value: 2014, label: 2014 },
  { value: 2015, label: 2015 },
  { value: 2016, label: 2016 },
];

const YearSlider = ({ setYear, setCurrYear }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const value = selectedOption.value

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
  }

  return (
    <div className="search-label">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};

export default YearSlider;
