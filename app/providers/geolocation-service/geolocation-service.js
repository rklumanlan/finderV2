import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';

/*
  Generated class for the GeolocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeolocationService {
  static get parameters(){
    return [[ConnectivityService]];
  }
  constructor(connectivityService) {
    this.connectivity = connectivityService;
    this.mapInitialised = false;
    this.apiKey = 'AIzaSyD4zGo9cejtd83MbUFQL8YU71b8_A5XZpc';
    this.loadGeolocation();
    // this.getPlaces();

    // this.geolocation = null;
    // console.log(this.geolocation);
  }

  loadGeolocation(ctr){
    console.log(ctr);
    var me = this;

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");


        if(me.connectivity.isOnline()){
            console.log("online, loading map");

            let script = document.createElement("script");
            script.id = "geoLocation";
            script.src = 'https://maps.googleapis.com/maps/api/js?key='+me.apiKey+'&libraries=places';


            document.body.appendChild(script);

        }
        else {
          // me.disableMap();

          // add error handler if offline -- alert box
        }
    }
    else {

        if(me.connectivity.isOnline()){
            console.log("showing map");
            // return me.initMap(ctr);
            // me.enableMap();
        }
        else {
            console.log("disabling map");
            // me.disableMap();

            // add error handler if offline -- alert box
        }

    }
  }
// getPlaces function Here
getPlaces(gcrds){

  console.log("Get Places Working");
  console.log(document.getElementById('places_map'));
  console.log(gcrds.lat);

  // var map = new google.maps.Map(document.getElementById('places_map'), {
  // center: {lat: -34.397, lng: 150.644},
  // scrollwheel: false,
  // zoom: 8
  // });

    // var pyrmont = {lat: gcrds.lat, lng: gcrds.lng };
    var pyrmont = {lat: parseFloat(gcrds.lat), lng: parseFloat(gcrds.lng)};

    map = new google.maps.Map(document.getElementById('places_map'), {
      center: pyrmont,
      zoom: 17
    });

    // var service = new google.maps.places.PlacesService(map);
    // service.nearbySearch({
    //   location: pyrmont,
    //   radius: 1000,
    //   type: ['restaurant']
    // }, processResults);
  }



  setLocationName(ctr){
    var me = this;
    var geo;
    me.getLocationName(ctr, function(result){
      console.log(result);
        geo =  result;
    });

    return new Promise(function(resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function() {
        resolve(geo); // After 3 seconds, resolve the promise with value 42
      }, 1000);
    });
  }

  getLocationName(ctr, callback) {
      var input = ctr;
      var latlngStr = input.split(',', 2);

      var locationName;
      var geocoder = new google.maps.Geocoder();
      var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

      // Reverse Geocoding using google maps api.
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                  locationName = results[1].formatted_address;
                  // alert(locationName);
                  // document.getElementById('geolocation').value = locationName;
              }
              else {
                  locationName = "Unknown";
              }
          }
          else {
              locationName = "Couldn't find location. Error code: " + status;
          }
          // document.getElementById('geolocation').value = locationName;
          callback(locationName);
      });
  }
  //
  // getPlaces(){
  //   console.log("Get Places Working");
  //
  //     var pyrmont = {lat: 15.151023200000001, lng: 120.55812309999999};
  //
  //     map = new google.maps.Map(document.getElementById('map'), {
  //       center: pyrmont,
  //       zoom: 17
  //     });
  //
  //     // var service = new google.maps.places.PlacesService(map);
  //     // service.nearbySearch({
  //     //   location: pyrmont,
  //     //   radius: 1000,
  //     //   type: ['restaurant']
  //     // }, processResults);
  //   }

    // processResults(results, status, pagination) {
    //   if (status !== google.maps.places.PlacesServiceStatus.OK) {
    //     return;
    //     }
    //   else {
    //     createMarkers(results);
    //
    //     if (pagination.hasNextPage) {
    //       var moreButton = document.getElementById('more');
    //
    //       moreButton.disabled = false;
    //
    //       moreButton.addEventListener('click', function() {
    //         moreButton.disabled = true;
    //         pagination.nextPage();
    //       });
    //     }
    //   }
    // }
    //
    // createMarkers(places) {
    //   var bounds = new google.maps.LatLngBounds();
    //   var placesList = document.getElementById('places');
    //
    //   for (var i = 0, place; place = places[i]; i++) {
    //     var image = {
    //       url: place.icon,
    //       size: new google.maps.Size(71, 71),
    //       origin: new google.maps.Point(0, 0),
    //       anchor: new google.maps.Point(17, 34),
    //       scaledSize: new google.maps.Size(25, 25)
    //     };
    //
    //     // var marker = new google.maps.Marker({
    //     //   map: map,
    //     //   icon: image,
    //     //   title: place.name,
    //     //   position: place.geometry.location
    //     // });
    //
    //     placesList.innerHTML += '<li>' + place.name + '</li>';
    //
    //     bounds.extend(place.geometry.location);
    //   }
    //   map.fitBounds(bounds);
  // }
// }


}
