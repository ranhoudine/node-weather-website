const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',
        {
            title: 'Weather',
            name: 'Ran',
        })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ran',

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page',
        name: 'Ran',

    })
})

app.get('/weather', (req, res) => {

    if (!req.query.city || !req.query.state) {
        return res.send({
            error: 'You must provide a city and a state'
        })
    }
    const city = req.query.city
    const state = req.query.state
    geocode(city, state, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }
            console.log(city, state)
            res.send({
                location,
                forecast: forcastData,
                city,
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Ran',
        title: '404'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Ran',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
//app.com
//app.com/help
// app.com/about

