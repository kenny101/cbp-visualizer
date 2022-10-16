const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 8080;


const routes = require("./routes/api");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://admin:Cbpdata5313!@G69B9ED90CED702-CBPDATABASE.adb.us-sanjose-1.oraclecloudapps.com:27017/cbpdata?authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=false&loadBalanced=true",
  {
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
}




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
