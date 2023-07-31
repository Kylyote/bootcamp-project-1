
var lati = '38.5367299382404'
var longi = '-121.75132258093318'

//code for response from Zip -CF
const mapApiKey = 'AIzaSyCdCvKcnQ665AVlVXI_6FRnSup7eCuGhqA';

const testZipCode = '95747';

function runSearch(){
fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${testZipCode}&key=${mapApiKey}`)
  .then(response => response.json())
  .then(data => {
    // geodata from the response
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

    initMap(latitude, longitude)
  })
  .catch(error => {
    console.error('Error:', error);
  })};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Google code for getting a map.
"use strict";




function initMap() {
  let myLatLng = {
    lat:  parseFloat(lati),
    lng: parseFloat(longi)
  };
  console.log(myLatLng)
  let map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 16,
    center: myLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
//changes position of map view controls -CF
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  });

  //search for placees in a radius -CF
  var service = new google.maps.places.PlacesService(map);
  var request = {
    location: myLatLng,
    radius: 1000, // Example radius: 1000 meters
    keyword: 'parks' // search term "park" "hike"
  };

  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
       console.log(place)
      }
    }
  }

//adds custom marker icon -CF
  new google.maps.Marker({
    position: myLatLng,
    icon: {
      url: './assets/images/parkIcon.svg',
     
    },
    title: "My location",
    map: map
  });
}



