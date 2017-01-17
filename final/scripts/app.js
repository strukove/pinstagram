// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main'),
    imageUploader: document.getElementById("image-uploader"),
    imageTag: document.getElementById("img")
  };

  // Get a reference to the database service
  var database = firebase.database();
  function writeUserData(imageCode) {
    database.ref('users/1').set({
      imageCode : imageCode
    });
  }

  initImage();
  function initImage() {
    // var userId = firebase.auth().currentUser.uid;
    var userId = 1;

    database.ref('/users/' + userId).once('value').then(function(data) {
      if (data.val() == null ) { return; }

      app.imageTag.src = data.val().imageCode;
      app.spinner.
    });
  }


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  app.imageUploader.addEventListener("change", readFile, false);

  geoFindMe();

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateForecasts = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getForecast(key);
    });
  };

  // TODO add saveSelectedCities function here
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };

  // TODO uncomment line below to test app with fake data
  // app.updateForecastCard(initialWeatherForecast);

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

  function geoFindMe() {

    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      // output.innerHTML = ;
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log('Latitude is ' + latitude + '° Longitude is ' + longitude + '°');

      // https://maps.googleapis.com/maps/api/staticmap?center=50.026033899999995,36.2249422&zoom=14&size=6000x6000&scale=2&maptype=roadmap&key=AIzaSyBDlyCV2UdLosDp3GK1g-vqwpXGJMsh4uk
      // var img = new Image();
      // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      // output.appendChild(img);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }

    // output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }

  function readFile() {
    if (this.files && this.files[0]) {
      var FR= new FileReader();
      FR.onload = function(e) {
        let imgSrc = e.target.result;
        app.imageTag.src = imgSrc;
        writeUserData(imgSrc);
      };
      FR.readAsDataURL( this.files[0] );
    }
  }


})();