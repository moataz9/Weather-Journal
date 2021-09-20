/* Global Variables */
// button
const generateButton = document.getElementById('generate')
// most-recent elements
const dateEl = document.getElementById('date')
const temperatureEl = document.getElementById('temp')
const feelingContentEl = document.getElementById('content')
const townEl = document.getElementById('town')
const weatherDescEl = document.getElementById('weatherDesc')
// error element
const errorEL = document.getElementById('error')

// Create a new date instance dynamically with JS
let d = new Date()
// add one to getMonth Becouse its returning months from zero
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()

// Personal API Key for OpenWeatherMap API
const weatherMapAPI_URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const weatherMapAPI_apiKey = '&appid=41c096cea92a482759e884f2e05ae7e5'

/* App Functionality */
// Event listener to add function to existing HTML DOM element
generateButton.onclick = () => {
  performWeatherActions()
}

/* Function called by event listener */
const performWeatherActions = () => {
  let zipCode = document.getElementById('zip').value
  let feelings = document.getElementById('feelings').value

  getWeatherState(weatherMapAPI_URL, zipCode, weatherMapAPI_apiKey)
    .then(data => {
      console.log(data)
      if (data.cod == '404') {
        errorEL.style.top = 0
        errorEL.innerHTML = data.message
        setTimeout(() => {
          errorEL.style.top = `-${errorEL.clientHeight}px`
        }, 3000)
        return
      }
      // add Data to post request
      postData('/add', {
        date: newDate,
        temp: data.main.temp,
        townName: data.name,
        weatherDesc: data.weather[0].description,
        content: feelings,
      })
    })
    .then(() => {
      updateClientUI()
    })
}

/* Function to GET Web API Data*/
const getWeatherState = async (apiUrl, zipCode, apiKey) => {
  const res = await fetch(apiUrl + zipCode + apiKey)

  try {
    const resData = await res.json()
    return resData
  } catch (err) {
    console.log('error', err)
  }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // body data type must match 'Content-Type' header
    body: JSON.stringify(data),
  })

  try {
    const newData = await res.json()
    return newData
  } catch (err) {
    console.log('error', error)
  }
}

/* Function to GET Project Data */
const updateClientUI = async () => {
  const requestedData = await fetch('/all')

  try {
    const reqData = await requestedData.json()
    dateEl.innerHTML = `<strong>Date: </strong>${reqData.date}`
    temperatureEl.innerHTML = `<strong>Temperature: </strong>${reqData.temp} °C`
    feelingContentEl.innerHTML = `<strong>I Feel: </strong>${reqData.content}`
    townEl.innerHTML = `<strong>Town name: </strong>${reqData.townName}`
    weatherDescEl.innerHTML = `<strong>Weather Description: </strong>${reqData.weatherDesc}`
  } catch (err) {
    console.log('error', err)
  }
}
