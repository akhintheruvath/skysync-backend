const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const weatherApiRoutes = require("./routes/weatherApiRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(cors());
app.use("/api", weatherApiRoutes);

mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
   console.log('Database connected successfully');
   app.listen(PORT, () => {
      console.log('Server started');
   });
}).catch((error) => {
   console.log(error.message);
});