const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c5d44629a956d4766107234c4aa8f6bd&query=${latitude},${longitude}`;

  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services')
    } else if(body.error) {
      callback(body.error.info)
    } else {
      const data = body.current;
      callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degress out. It feels like ${data.feelslike} degrees out.`)
    }
  })
}

module.exports = forecast;