const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
// if we own the following domain app.com
//we have routes like app.com, app.com/help, app.com/about
const viewDirectory = path.join(__dirname, '../templates/views')
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        header: 'Homepage',
        name: 'Shakil'
    })
});
app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help page',
        header: 'Ask anything',
        name: 'Shorif'

    })
});
app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About us',
        header: 'Know about us',
        name: 'Shakil'
    })

});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Yo must input an address and nothing else (e.g ../weaher?address=somewhere)"
        })
    }
    geocode(req.query.address, (error, {
        lattitude,
        longitude,
        placeName
    }={}) => {

        if (error) {
            return res.send({error: error})
        }
        forecast(lattitude, longitude, (error, { summary, temperature, precipProbability, preciptype }={}) => {
            if (!error) {
                res.send({
                    placeneme: placeName,
                    summary: summary,
                    temperature: temperature,
                    preciptype: preciptype,
                    precipProbability: precipProbability
                })
                
            } else {
                res.send({error: error})
            }
        })
    })

})
//Error page
app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error: 404. Page not fond',
        header: 'Seems that, You are lost!',
        name: "Shakil",
        rescue: '/'
    })
})
app.listen(port, () => {
    console.log('Alive @', port)
})