const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views lcoation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather home',
    name: 'Modestas'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About home',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help home',
    message: 'Help message',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }

  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(long, lat, (error, forecast) => {
      if (error) {
        return res.send({
          error
        })
      }
     
      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  });
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not Found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not Found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})