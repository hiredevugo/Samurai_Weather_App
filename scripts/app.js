// the entire code here is for interacting with the DOM

// referencing the DOM, especially our form that will be used to enter the information we will work with
const cityLocation = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeOfDay = document.querySelector('img.time');
const weatherIcon = document.querySelector('.icon img');

// resources for climate icons: https://adamwhitcroft.com/climacons

// next step is to create a function that will be used in updating the DOM/UI anytime we get a new city & weather information/data
const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

// next step is to update the template in our html using the innerHTML property because its the HTML we want to manipulate, using template strings we will just copy the entire div and replace the values with template string values based on how the city details and weather details data are on the console
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>

    `;

    // updating the night/day & icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    weatherIcon.setAttribute('src', iconSrc);


    let timeOfDaySrc = null;
    if(weather.IsDayTime){
        timeOfDaySrc = 'img/day.svg';
    }
    else{
        timeOfDaySrc = 'img/night.svg';
    }
    timeOfDay.setAttribute('src', timeOfDaySrc);

    // removing the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};




// creating a function that will update the city anytime we enter a new city information
const updateCity = async (city) => {
  const cityDetails = await getCity(city); // calling these functions because they have already been declared in our forecast.js file and in our html code we have placed forecast.js before app.js
  const weather = await getWeather(cityDetails.Key);

  // we are returning the data gotten from the above citydetails and weather in an object because it is data that is more than one, since the object key is the same with the value, we can use what we call object shorthand notation to represent the object below, please not do not use this if the key name is not the same as the value name

  return {
    cityDetails,
    weather  
  };

};

// next is to add an event listener because when creating forms we intend for the forms to take in data and submit the data for use

cityLocation.addEventListener('submit', (e) => {
    // preventing form submitting default
    e.preventDefault();
    // next is to get the input value entered by the user, lets put this in a constant or variable
    const city = cityLocation.city.value.trim();
    cityLocation.reset(); // - resetting the form after submitting

    // updating the DOM with a new city
    updateCity(city)
        .then((data) => {
            updateUI(data); // calling the updateUI function 

        })
        .catch((error) => {
            console.log(error);
        });

});