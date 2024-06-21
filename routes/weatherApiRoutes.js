const express = require("express");
const router = express.Router();
const openWeatherMap = require("../controllers/openWeatherMapController");

router.get("/current-weather", openWeatherMap.currentWeather);

module.exports = router;