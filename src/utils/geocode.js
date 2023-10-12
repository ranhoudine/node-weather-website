const request = require('request')


const geocode = (city, state, callback) => {
    const url = 'https://geocode.maps.co/search?city=' + encodeURIComponent(city) + '&state=' + encodeURIComponent(state)
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const {lat: latitude, lon: longitude, display_name} = response.body[0]
            console.log(response.body[0])
            callback(undefined, {
                latitude,
                longitude,
                location: display_name
            })
        }
    })
}

module.exports = geocode