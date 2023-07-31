// Google code for getting a map.
"use strict";


function initMap() {
  let myLatLng = {
    lat:  38.5367299382404,
    lng: -121.75132258093318
  };
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

const testZipCode = '92102';

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${testZipCode}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // geodata from the response
    const city = data.results[0].address_components[1].long_name;
    const state = data.results[0].address_components[2].short_name;
    const latitude = data.results[0].geometry.location.lat;
    const longitude = data.results[0].geometry.location.lng;

   
    console.log(`City: ${city}`);
    console.log(`State: ${state}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });