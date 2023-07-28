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
    streetViewControl: true
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "My location"
  });
}