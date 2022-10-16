const express = require("express");
const app = express();
const router = express.Router();
const topSectors = require("../models/topSectorModel");
const employmentData = require("../models/employmentDataModel");


router.get("/quantiles", (req, res) => {
  const { Year, Sector } = req.query;
  employmentData
    .find({ Year: Year , Sector: Sector }, { Quantiles: 1 , _id: 0, Year: 1, Sector: 1 })
    .then((data) => {
        if (data === undefined || data.length == 0) {
          res.status(404).send("No data found");
        }else{
          res.json(data);
        }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/employment-data", (req, res) => {
  const { Year, Sector } = req.query;
  employmentData
    .find({ Year: Year , Sector: Sector }, { Employment: 1 , _id: 0, Year: 1, Sector: 1 })
    .then((data) => {
        if (data === undefined || data.length == 0) {
          res.status(404).send("No data found");
        }else{
          res.json(data[0]);
        }
    })
    .catch((error) => {
      console.log(error);
    });
});



router.get("/top-sectors", (req, res) => {
  const { Year } = req.query;
  topSectors
    .find({ Year: Year }, { _id: 0 })
    .then((data) => {
        if (data === undefined || data.length == 0) {
          res.status(404).send("No data found");
        }else{
          res.json(data);
        }
    })
    .catch((error) => {
      console.log(error);
    });
});



module.exports = router;
