// Adding potential variables to use to access the document elements
let addressCity = document.querySelector(".text");
let addressState = document.querySelector(".state-dropdown");
let addressCode = document.querySelector(".postal-code");
let distanceRadius = document.querySelector("#distanceRadius");
let submitBtn = document.querySelector("#searchBtn");
let distanceRadiusChange = 0;

//Smooth scroll on how-to
document.getElementById("how-to-link").addEventListener("click", function (event) {
  event.preventDefault();

  const targetElement = document.getElementById("class-card-section");

  targetElement.scrollIntoView({ behavior: "smooth" });
});

// Block of code copied from Google's maps platform
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();