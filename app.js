require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api");

//  express app
const app = express();
const port = process.env.PORT || 8080;

//  connect to mongoose
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

// parse body
app.use(express.json());

//    use routes
app.use("/api", routes);

//  listen to server
app.listen(port, () => console.log(`listening on port ${port}`));
