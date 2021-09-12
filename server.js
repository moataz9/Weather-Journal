// Setup empty JS Array to act as endpoint for all routes
projectData = []
// Require Cors
const cors = require('cors')
// Require Express to run server and routes
const express = require('express')

// set up port
const PORT = 5000
// Start up an instance of app
const app = express()

/* Middleware*/
// Here we are configuring express-app to use express urlencoded & json as middle-ware
// instead of deprecated body-parser.
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'))

// Setup Server
// home get route
app.get('/all', (req, res) => {
  res.send(projectData)
  console.log(projectData);
})

//  post add route
app.post('/add', (req, res) => {
  newProjectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
    townName: req.body.townName,
    weatherDesc: req.body.weatherDesc
  }
  projectData.push(newProjectData)
})

// spin out the server
app.listen(PORT, () => console.log('app running at http://localhost:%i', PORT))
