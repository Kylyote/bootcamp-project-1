// Google code for getting a map.
"use strict";


function initMap() {
  let myLatLng = {
    lat: 38.5367299382404,
    lng: -121.75132258093318
  };
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
