const request = require('request')

const weatherstackURL = 'http://api.weatherstack.com/current?access_key=138b25a79f7f6a45ba8bf748981c17bc&query=&units=m'

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=138b25a79f7f6a45ba8bf748981c17bc&query=' + encodeURIComponent(lat)
     +',' + encodeURIComponent(long) + '&units=m'

     request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if( response.body.error) {
            callback('Unable to fetch the weather. Try a different query', undefined)
        } else {
            const {temperature, precip: rainProb} = response.body.current
            weatherDescription = response.body.current.weather_descriptions[0]
            callback(undefined ,weatherDescription + ". It is currently " + temperature + " degrees out. There is a " + rainProb + "% chance of rain. ")
        }
     })
}

module.exports = forecast