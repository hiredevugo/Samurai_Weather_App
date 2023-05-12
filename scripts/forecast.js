// the entire code here is for interacting with the AccuWeather API's

const key = 'n7rQIOBaGUAzlTOzUXPfEXzRAG2RzysU';

// getting the weather condition using the weather condition API reference:
// create a function that will make the weather condition information request which is a promise by using the async keyword before the function

const getWeather = async (id) => {
    const baseUrl = 'https://dataservice.accuweather.com/currentconditions/v1/'; //- API endpoint || Resource URL
    const queryParameters = `${id}?apikey=${key}`; // - setting up the parameter required which is the apikey and the location key which we called id in our code using template strings

    const response = await fetch(baseUrl + queryParameters);
    const data = await response.json();
    return data[0];
};


// getting the city information using the search city API reference:
// create a function that will make the city information request which is a promise by using the async keyword before the function
// please note when adding query parameters to the end of a string the first to do is to start with a ?

const getCity = async (city) => {
    const baseUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search'; //- API endpoint || Resource URL
    const queryParameters = `?apikey=${key}&q=${city}`; //- setting up the two parameters required for a city search API to work which is the API Key and the q parameter using template strings

    const response = await fetch(baseUrl + queryParameters); //- aimed at getting the response from fetch the API as illustrated in the API Reference
    const data = await response.json(); // - in other to get the data from the response thats the next step and the essence of using/fetching API's it is to get/obtain data
    return data[0];

};

getCity('Benin City')
      .then((data) => {
        return getWeather(data.Key); //- returning the data from the function getWeather()
      })
      .then((data) => {
        console.log(data)
      }).catch((error) => {console.log(error)});