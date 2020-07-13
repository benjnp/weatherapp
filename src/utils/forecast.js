const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=be33d03d1c4ab4194f9aeb0f4e18784d&query=' + latitude + "," + longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error)
            callback("Unable to fetch the data for this location")
        else {
            callback('', {
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0],
                location: body.location.name
            })
        }
    })
}

module.exports = forecast