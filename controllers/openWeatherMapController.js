const path = require("path");
const fs = require("fs");
const axios = require("axios");
const apis = require("../config/apiEndPoints");
const locations = require("../models/locationsModel");
const { timestampToDDMMMYYY, timestampToHHmm } = require("../utils/commonMethods");

const currentWeather = async (req, res) => {
   try {
      if(!req.query.cityName) {
         return res.status(400).send({
            success: false,
            message: "cityName is not provided in the request"
         });
      }
      
      const { cityName } = req.query;

      const locationCoordinatesFilePath = path.join(__dirname, "../data/locationCoordinates.json");
      let locationCoordinates;

      try {
         locationCoordinates = fs.readFileSync(locationCoordinatesFilePath);
         locationCoordinates = JSON.parse(locationCoordinates);
      } catch (err) {
         console.log('Error while reading file: ', err);
         throw new Error("Something went wrong while reading the form configurations file.");
      }

      const cityCoordinatesDetails = locationCoordinates.find(obj => obj.name === cityName);
      if(!cityCoordinatesDetails) {
         return res.status(400).send({
            success: false,
            message: "Provided city details are not available",
         });
      }
      
      const latitude = cityCoordinatesDetails.lat;
      const longitude = cityCoordinatesDetails.lon;
      const units = "Metric";
      const { data } = await axios.get(
         `${apis.OpenWeatherMap}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${process.env.API_KEY}`
      );

      const result = {
         cityName: data.name,
         temperature: Math.round(data.main.temp),
         weatherType: data.weather[0].main,
         feelsLike: data.main.feels_like,
         latitude: data.coord.lat,
         longitude: data.coord.lon,
         date: timestampToDDMMMYYY(data.dt, data.timezone),
         sunset: timestampToHHmm(data.sys.sunset, data.timezone),
      };

      await locations.create({
         name: result.cityName,
         lat: result.latitude,
         long: result.longitude,
         timezone: data.timezone,
         timestamp: data.dt,
         temperature: result.temperature,
         weatherType: result.weatherType,
         date: result.date,
         sunset: result.sunset,
      });

      return res.status(200).send({
         success: true,
         data: result,
         message: "Success",
      });
   } catch (error) {
      console.log("Error occured in currentWeather: ", error.message);
      return res.status(500).send({
         success: false,
         message: error.message,
      });
   }
}

module.exports = {
   currentWeather,
}