const request = require('request')
const forecast = (latt, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a14f6f456bfe35627642f442cc6fedf0/' + latt + ',' + long + '?exclude=minutely,hourly,daily&lang=bn&units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Internal error occured. try agai later', undefined)
        } else if (body.error) {
            callback('Could not fetch weather data', undefined)
        } else {
            callback(undefined, {summary: body.currently.summary, 
                                temperature: body.currently.temperature,
                                precipProbability: body.currently.precipProbability,
                                precipType: body.currently.precipType
                            })
        }
    })
}


module.exports = forecast