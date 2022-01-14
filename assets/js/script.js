var searchedFruit = "";
var carbs = "";
var protein = "";
var fat = "";
var calories = "";
var sugar = "";
var searchHistory = [];

//dictionary variables
var definition = "";
var phonetic = "";

// Function to retrieve API data from FruityVice
function getFruityVice() {

    // Since FruityVice is not CORS enabled have to go through proxy URL
    var proxyURL = "https://cors-anywhere.herokuapp.com/"
    var fetchURL = "https://www.fruityvice.com/api/fruit/" + searchedFruit;
  
    fetch(proxyURL + fetchURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        carbs = response.nutritions.carbohydrates;
        protein = response.nutritions.protein;
        fat = response.nutritions.fat;
        calories = response.nutritions.calories;
        sugar = response.nutritions.sugar;
        })
      
  }


// function to retrieve data from dictionary API

function getDictionary() {
  var proxyURL = "https://cors-anywhere.herokuapp.com/"
  var fetchURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchedFruit;

  fetch(proxyURL + fetchURL)
  .then(function(response){
    return response.json();
  })
  .then(function(response) {
    phonetic = response[0].phonetic;
    definition = response[0].meanings[0].definitions[0].definition;
    console.log(definition);
    console.log(phonetic);
  }

  )};

  // getDictionary()


// Stores are search result into the variable "searchedFruit" and saves it to local storage

var storeData = function() {
  
    searchedFruit = $("#searchForm").val();
    searchHistory.push(searchedFruit);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
       
    getFruityVice();
}


// Listener for our button click
$("#searchBTN").on("click", storeData);




  