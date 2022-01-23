// global variables
var carbs = "";
var protein = "";
var fat = "";
var calories = "";
var sugar = "";
var family = "";
var genus = "";
var searchHistory = [];
var searchedFruit = "";
var definition = "";
var phonetic = "";
var toggle = false;

//Since our APIs are not CORS enabled
var proxyURL = "https://api.allorigins.win/raw?url=";

//error handler to write html when results can't be found
function errorHandler() {
  $("#caloriesResult").text("N/A");
  $("#definitionResult").text("We can't find the fruit " + searchedFruit + " try again.");
  $("#phoneticResult").text("N/A");
  $("#genusResult").text("N/A");
  $("#familyResult").text("N/A");
}

// Store data in local storage

var storeData = function() {
  event.preventDefault();
  searchedFruit = $("#searchForm").val();
  searchHistory.push(searchedFruit);
  // push searched fruit value to html h2
  $("#fruitHeader").text(searchedFruit);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  getFruityVice();

}

// Function to retrieve API data from FruityVice

function getFruityVice() {

  var fetchURL = "https://www.fruityvice.com/api/fruit/" + searchedFruit;

  fetch(proxyURL + fetchURL).then(function (response) {
    if (response.ok) {
      return response.json()
      .then(function(response) {
        genus = response.genus;
        family = response.family;
        calories = response.nutritions.calories;
        $("#genusResult").text(genus);
        $("#familyResult").text(family);
        $("#caloriesResult").text(calories);
        // run dictionary function if successful call is made with fruityvice
        getDictionary()
        })
    } else {
      errorHandler();
    }
  }).catch(function () {
      errorHandler();
  })

};


// function to retrieve data from dictionary API

function getDictionary() {

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

// Query local storage to display history

var displayHistory = function(){
  
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
  $("#searchHistory").children().remove();
  if (searchHistory == null) {
    searchHistory = [];
  } else { for (i = 0; i < searchHistory.length; i++) {
    
    
    var elementli = $("<li>")
    var elementButton = $("<button>").attr("type", "button").attr("id", "historyBTN").attr("value", searchHistory[i]).attr("class", "text-xl text-black border-2 bg-purple-900 text-white rounded-lg p-2").text(searchHistory[i]);
         
    $("#searchHistory").append(elementli, elementButton)

  }}
  
}

// Update our fruit facts when history button is clicked
var updateFruit = function() {
    searchedFruit = $(this).val();
    $("#fruitHeader").text(searchedFruit);
    getFruityVice();
    getDictionary();
    $("#History").attr("class", "hidden")
    
}  

// Displays our search history card
var displayCard = function() {
  $("#History").attr("class", "show")
  if (toggle == false) {
    toggle = true;
    displayHistory();
  } else if (toggle == true) {
    toggle = false;
    $("#History").attr("class", "hidden")
  }
}

  // Listener for our button click
$("#searchBTN").on("click", storeData);
$("#modalBTN").on("click", displayCard)
$(document).on("click", "#historyBTN", updateFruit);




