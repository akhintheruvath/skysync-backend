const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   lat: {
      type: Number,
      required: true,
   },
   long: {
      type: Number,
      required: true,
   },
   timezone: {
      type: Number,
      required: true,
   },
   timestamp: {
      type: Number,
      required: true,
   },
   date: {
      type: String,
      required: true,
   },
   sunset: {
      type: String,
      required: true,
   },
   temperature: {
      type: Number,
      required: true,
   },
   weatherType: {
      type: String,
      required: true,
   }
});

module.exports = mongoose.model('weathers', weatherSchema);