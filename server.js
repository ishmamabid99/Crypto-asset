const mongoose = require('mongoose');
require("dotenv").config();
const express = require('express');



const documentRoute = require('./routes/Document');

const app = express();
const cors = require('cors');



app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/asset", documentRoute);




app.listen(8080, function () {
  console.log("Server started on port 8080");
});
