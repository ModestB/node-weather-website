const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9kZXN0YXNidWoiLCJhIjoiY2tmam44dXZrMGl5NjMwcWhtYjJhNHR5byJ9.7WB1eoUFMKEofuHNdOE4bw&limit=1`;

  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to services')
    } else if (!body.features.length) {
      callback('Unable to find location')
    } else {
      const long = body.features[0].center[0];
      const lat = body.features[0].center[1];
      const location = body.features[0].place_name
      callback(undefined, {long, lat, location})
    }
  })
};

module.exports = geocode;