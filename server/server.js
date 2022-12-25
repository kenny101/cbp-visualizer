require('dotenv').config();


const express = require("express");
const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");
const cors = require('cors')
app.use(cors())

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const routes = require("./routes/api");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

mongoose.connect(
  "REDACTED KEY",
  {
    dbName: "cbpdata",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);



mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use("/api", routes);



app.listen(PORT, console.log(`Server is starting at ${PORT}`));
