import {NavController} from 'ionic-angular';
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';

import {MainPage} from '../../pages/main/main';

/*
  Generated class for the GeolocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeolocationService {
  static get parameters(){
    return [[ConnectivityService],[NavController]];
  }
  constructor(connectivityService,nav) {
    this.connectivity = connectivityService;
    this.mapInitialised = false;
    this.apiKey = 'AIzaSyD4zGo9cejtd83MbUFQL8YU71b8_A5XZpc';
    this.loadGeolocation();

    this.latlng = {};
    this.nav = nav;
    this.MainPage  = MainPage;

    // this.getPlaces();

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
      console.log(new google.maps.Geocoder());
      var geocoder = new google.maps.Geocoder();
      var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

      // Reverse Geocoding using google maps api.
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                console.log(results[1].address_components[0].types[0]);
                console.log(results[1]);

                var locString = [];
                var locString2;

                for (var i = 0; i < results[1].address_components.length; i++) {

                  if (results[1].address_components[i].types[0]!='administrative_area_level_2') {
                    locString.push(results[1].address_components[i].long_name);
                  }
                  locString2 = locString.join(', ');
                }
                locationName = locString2;
              }
              else {
                  locationName = "Unknown";
              }
          }
          else {
              locationName = "Couldn't find location. Error code: " + status;
          }
          callback(locationName);
      });
  }

  autoComplete(){
    console.log('lll');
    var me = this;

    // console.log(document.getElementById('geo'));
    // console.log(new google.maps.places);
    var input = document.getElementById('geolocation').getElementsByTagName('input')[0];
    // console.log(new google.maps.places.Autocomplete(document.getElementById('geo')));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      me.latlng.lat = place.geometry.location.lat();
      me.latlng.lng = place.geometry.location.lng();

      var autolocString = [];
      var autolocString2;

      for (var i = 0; i < place.address_components.length; i++) {

        if (place.address_components[i].types[0]!='administrative_area_level_2') {
          autolocString.push(place.address_components[i].long_name);
        }
        autolocString2 = autolocString.join(', ');
      }
      me.latlng.locationName = autolocString2;
      // setTimeout(function() {
        me.nav.push(MainPage, { geoloc: me.latlng });

      // }, 2000);

    });


  }

  // Police Station Map
  getPolice(poldetail){

    console.log("Get Police Lat Working");
    // console.log(document.getElementById('police_map'));
    console.log(poldetail.lat, poldetail.lng);

    var mapcoords = {lat: parseFloat(poldetail.lat), lng: parseFloat(poldetail.lng)};

    map = new google.maps.Map(document.getElementById('police_map'), {
      center: mapcoords,
      zoom: 15
      });

    var marker = new google.maps.Marker({
      position: mapcoords,
      map: map,
      title: 'Hello World!'
    });
    }

  // Police Station Map
  getHospital(hospdetail){

    console.log("Get Hospital Lat Working");
    // console.log(document.getElementById('police_map'));
    console.log(hospdetail.lat, hospdetail.lng);

    var mapcoords = {lat: parseFloat(hospdetail.lat), lng: parseFloat(hospdetail.lng)};

    map = new google.maps.Map(document.getElementById('hosp_map'), {
      center: mapcoords,
      zoom: 15
      });

    var marker = new google.maps.Marker({
      position: mapcoords,
      map: map,
      title: 'Hello World!'
    });
    }

}
