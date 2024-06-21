const moment = require("moment-timezone");

function timestampToDDMMMYYY(timestamp, timezoneOffset) {
   const timezoneInMinutes = timezoneOffset / 60;
   return moment.unix(timestamp).utcOffset(timezoneInMinutes).format('DD MMM YYYY');
}

function timestampToHHmm(timestamp, timezoneOffset) {
   const timezoneInMinutes = timezoneOffset / 60;
   return moment.unix(timestamp).utcOffset(timezoneInMinutes).format('HH:mm');
}

module.exports = {
   timestampToDDMMMYYY,
   timestampToHHmm,
}