// global variables
var carbs = "";
var protein = "";
var fat = "";
var calories = "";
var sugar = "";
var searchHistory = [];
var searchedFruit = "";
var definition = "";
var phonetic = "";

//error handler to write html when results can't be found
function errorHandler() {
  $("#caloriesResult").text("N/A")
  $("#definitionResult").text("We can't find the fruit " + searchedFruit + " try again.")
  $("#phoneticResult").text("N/A")
}

function getFruityVice() {

  // Since FruityVice is not CORS enabled have to go through proxy URL
  var proxyURL = "https://cors-anywhere.herokuapp.com/"
  var fetchURL = "https://www.fruityvice.com/api/fruit/" + searchedFruit;

  fetch(proxyURL + fetchURL)
  .then(response => {
    if (response.ok) {
      return response.json()
      .then(function(response) {
        // COMMENTING OUT UNUSED RESPONSES FOR NOW
        // carbs = response.nutritions.carbohydrates;
        // protein = response.nutritions.protein;
        // fat = response.nutritions.fat;
        calories = response.nutritions.calories;
        // sugar = response.nutritions.sugar;
        $("#caloriesResult").text(calories);
        // run dictionary function if successful call is made with fruityvice
        getDictionary()
        })
    } else {
      errorHandler()
    }
  })

};


// function to retrieve data from dictionary API

function getDictionary() {
var proxyURL = "https://cors-anywhere.herokuapp.com/"
var fetchURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchedFruit;

fetch(proxyURL + fetchURL)
.then(response => {
  if (response.ok) {
    return response.json()
    .then(function(response) {
  phonetic = response[0].phonetic;
  definition = response[0].meanings[0].definitions[0].definition;
  $("#definitionResult").text(definition);
  $("#phoneticResult").text(phonetic);
    })
} else {
errorHandler()
}

})
}

var storeData = function() {
  event.preventDefault();
  searchedFruit = $("#searchForm").val();
  searchHistory.push(searchedFruit);
  // push searched fruit value to html h2
  $("#fruitHeader").text(searchedFruit);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
     

// Function to retrieve API data from FruityVice
getFruityVice()
};

  // Listener for our button click
$("#searchBTN").on("click", storeData)