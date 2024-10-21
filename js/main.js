


//type in a zipcode
//get place name, latitude and longitude from data pulled
//plug lat and long into sunrise sunset api



document.querySelector('#button').addEventListener('click', getSunriseAndSunset)

function getSunriseAndSunset() {

    const userZipCode = document.querySelector('#input').value
    const locationUrl = `https://api.zippopotam.us/us/${userZipCode}`

    fetch(locationUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        //grab latitude and longitude
        const latitude = data.places[0].latitude
        console.log('Latitude: ', latitude)

        const longitude = data.places[0].longitude
        console.log('Longitude: ', longitude)


        //plug latitude and longitude from first fetch into query parameters of second fetch
        //returns sunrise and sunset in Eastern Time
        
        fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&tzid=America/Toronto&date=today`)
        .then(res => res.json())
        .then(data2 => {

        console.log(data2)


        displayOnDOM(data, data2)

        })
    .catch(err => {
        console.log(`error ${err}`)
    })
    })

}

function displayOnDOM(data, data2) {

    //grab city and state from first fetch and display
    const city = data.places[0]['place name']
    const state = data.places[0]['state abbreviation']

    //grab sunrise and sunset from second fetch and display
    const sunrise = data2.results.sunrise
    const sunset = data2.results.sunset

    document.querySelector('#location').innerText = `${city}, ${state}`
    document.querySelector('#sunrise').innerText = `Sunrise: ${sunrise}`
    document.querySelector('#sunset').innerText = `Sunset: ${sunset}`

}
