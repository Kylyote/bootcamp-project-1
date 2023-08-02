var pageURL = window.location.href
var indexURL = "index.html"
var mapsURL = "maps.html"

document.addEventListener("DOMContentLoaded", function() {
    var homePage = document.querySelector('.home-page');
    if (pageURL.includes(indexURL)) {
      console.log("index HTML page has loaded!");
      
      homePage.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        runFromHP();
      }
    });
    
    }
  });
  
function runFromHP() {
    
  distance = document.querySelector('#distance-radius').value
  console.log(distance)
  zip = document.querySelector('#zip-form-input').value
  console.log(zip)
  city = document.querySelector('#city-form-input').value
  console.log(city)

  if (zip !== "") {
    place = zip
    console.log(zip)
  } else if (city !== ""){
    place = city
    console.log(city)
  }

const myObject = { 
    radius: distance,
    location: place
 };
  const jsonString = JSON.stringify(myObject);
  localStorage.setItem('myObject', jsonString);


 window.location.href = "maps.html";
  }




