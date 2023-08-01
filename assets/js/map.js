//sets initial search location and eventually radius -CF
let defaultLocation = '95616';

//code for response from Zip -CF
const mapApiKey = 'AIzaSyCdCvKcnQ665AVlVXI_6FRnSup7eCuGhqA';

// this is the function to actually kicks off the start of the search -CF 
// I decided to prioritize ZIP Code because it is usually more accurate, however, if there is no ZIP Code, it will default to city=CF
function runSearch(){
  const userCity = document.querySelector('#city-form-input').value;
  console.log(userCity)
  
  const userZip = document.querySelector('#zip-form-input').value;
  
  if (userZip !== "") {
    runWithUserInput(userZip)
    console.log(userZip)
  } else if (userCity !== ""){
    runWithUserInput(userCity)
    console.log(userCity)
  }
}
// console.log(userCity)

// function for running research with user input-CF 
function runWithUserInput (userInput){
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${mapApiKey}`)
  .then(response => response.json())
  .then(data => {
    // geo-data from the response -CF
    const city = data.results[0].address_components[1].long_name;
    const state = data.results[0].address_components[2].short_name;
    var latitude = data.results[0].geometry.location.lat;
    var longitude = data.results[0].geometry.location.lng;
    
    
    console.log(`City: ${city}`);
    console.log(`State: ${state}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    
    lati = latitude
    longi = longitude
    
    let outputBox = document.querySelector("#search-details");
    outputBox.innerHTML = "";
    fetchWeatherData(latitude, longitude);
    initMap(latitude, longitude)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Google code for getting a map.
"use strict";

function initMap() {
  let myLatLng = {
    lat: parseFloat(lati),
    lng: parseFloat(longi)
  };
  console.log(myLatLng)
  let map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 16,
    center: myLatLng,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: false,
    //changes position of map view controls -CF
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  });
  
  //search for places in a radius -CF
  
  var service = new google.maps.places.PlacesService(map);
  var keywords = ['park', 'hike', 'trail', 'nature preserve'];
  var radius = 1000; //still nee to make this a variable
  
  keywords.forEach(function(keyword) {
    var request = {
      location: myLatLng,
      radius: radius,
      keyword: keyword
    };
  
  
  service.nearbySearch(request, callback);
});
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log("results length: " + results.length)
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(results.length);
        console.log(place);
        //Making object to feed into giveTitleDetails
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();

      console.log("Latitude: " + latitude);
      console.log("Longitude: " + longitude);
      let userLatLng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      };
  makeYourMark(userLatLng, map, place.name)
        let request = {
          placeId: place.place_id,
          fields: ['name','reviews','opening_hours','rating']
        };
        giveTitleDetails(request); 
      }
    }
  }
  
  //Code for getting details
  function giveTitleDetails(request) {
    service.getDetails(request,function(details, status){
      if (status === google.maps.places.PlacesServiceStatus.OK)
      console.log(details);
      console.log(details.reviews[0].text);
      //helper for creating a unique id for each section
      var infoID = details.name.replace(/[.\s]/g, "");
      console.log(infoID); 

      let parkContents = document.createElement("div");
      parkContents.innerHTML = `
      <div id="${infoID}" class="mini-box-justforxample side-by-side align-spaced">
      <p class="location-title">${details.name}</p>
      <p class="distance">7.5mi</p>
      </div>
      <div class="expanded-box more-location-info">
      <p class="more-info" id="description">${details.reviews[0].text}</p>
      <p class="more-info" id="hours">9am-5pm</p>
      <div class="side-by-side">
      <p class="more-info">Website:</p>
      <p class="more-info" id="website">something.com</p>
      </div>
      <p class="more-info" id="go-to">open in google maps</p>
      </div>
      `;
      let outputBox = document.querySelector("#search-details");
      outputBox.appendChild(parkContents);
    });
  }

  //adds custom marker icon -CF

}

runWithUserInput(defaultLocation);

function makeYourMark(userLatLng, map, placeName){
  var marker = new google.maps.Marker({
  position: userLatLng,
  icon: {
    url: './assets/images/parkIcon.svg',
    
  },
  title: placeName,
  map: map
});
var placeID = placeName.replace(/[.\s]/g, "");
   

var infowindow = new google.maps.InfoWindow({
  content: `<div class='info-window'>${placeName}</div>`
});


marker.addListener('mouseover', function() {
  infowindow.open(map, marker);
});

marker.addListener('click', function(event) {   
  console.log(placeID);
  var container = document.getElementById("container"); 
  var section = document.querySelector(`#${placeID}`);
  section.scrollIntoView();
  container.scrollIntoView();
  //hande mouse click functionality;
  return false;
});

marker.addListener('mouseout', function() {
  infowindow.close();
});
}
