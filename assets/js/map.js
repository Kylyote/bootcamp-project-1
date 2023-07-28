// Google code for getting a map.
"use strict";

function initMap() {
  const myLatLng = {
    lat: 40.12150192260742,
    lng: -100.45039367675781
  };
  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 4,
    center: myLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "My location"
  });
}