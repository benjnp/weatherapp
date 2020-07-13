const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Benj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Benj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Benj'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Benj",
        error: "Help article not found"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location)
        return res.send({
            error: "Please enter a location"
        })
    else {
        geocode(req.query.location, (geoError, { latitude, longitude, placeName } = {}) => {
            if (geoError)
                return res.send({
                    error: geoError
                })
            forecast(latitude, longitude, (error, { location, description, temperature }) => {
                if (error)
                    return res.send({
                        error: error
                    })

                if (location) {
                    return res.send({
                        Forecast: "It is " + description + " with a temperature of " + temperature + " degrees celsius",
                        Location: placeName,
                        Temperature: temperature,
                    })
                }
                else {
                    return res.send({
                        Forecast: "It is " + description + " with a temperature of " + temperature + " degrees celsius",
                        Location: 'Unknown',
                        Temperature: temperature,

                    })
                }

            })


        })
    }
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Benj",
        error: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up at port ' + port)
})