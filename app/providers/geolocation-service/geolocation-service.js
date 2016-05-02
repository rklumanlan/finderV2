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
    this.geolocation = null;
    this.loadGeolocation();
    console.log(this.geolocation);
  }

  loadGeolocation(ctr){
    console.log(ctr);
    var me = this;

    // me.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");


        if(me.connectivity.isOnline()){
            console.log("online, loading map");
            console.log('1');




            let script = document.createElement("script");
            script.id = "geoLocation";

            // if(me.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key='+me.apiKey +'&callback=mapInit';
            // } else {
            //     script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
            // }

            document.body.appendChild(script);

            //Load the SDK
            var asd;
            window.mapInit = function(){
              // asd = me.getLocationName(ctr, function(result){
              //   return result;
              //     // $("#userLocation").text(result);
              //     // me.geolocation =  result;
              //     // console.log('2');
              //     // document.getElementById('geolocation').value = me.geolocation;
              //     // console.log(me.geolocation);
              // });
              // console.log(asd);
            }
            console.log(window.mapInit);

            console.log(me.geolocation);
            console.log('3');

        }
        else {
          // me.disableMap();
        }
    }
    else {

        if(me.connectivity.isOnline()){
            console.log("showing map");
            return me.initMap(ctr);
            // me.enableMap();
        }
        else {
            console.log("disabling map");
            // me.disableMap();
        }

    }
  }

  addConnectivityListeners(){
    var me = this;

    var onOnline = function(){
        setTimeout(function(){
            if(typeof google == "undefined" || typeof google.maps == "undefined"){
                me.loadGoogleMaps();
            } else {
                if(!me.mapInitialised){
                    me.initMap(ctr);
                }

                // me.enableMap();
            }
        }, 2000);
    };

    var onOffline = function(){
        // me.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }

  initMap(ctr){
    var me = this;
    me.mapInitialised = true;
    // return ctr;
    // var geocoder = new google.maps.Geocoder();
    // var infowindow = new google.maps.InfoWindow();
    // var input = ctr;
    // var latlngStr = input.split(',', 2);
    // // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    // // var bb;
    // var locationName;
    // var geocoder = new google.maps.Geocoder();
    // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    //
    // // Reverse Geocoding using google maps api.
    // geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         if (results[1]) {
    //             locationName = results[1].formatted_address;
    //             alert(locationName);
    //         }
    //         else {
    //             locationName = "Unknown";
    //         }
    //     }
    //     else {
    //         locationName = "Couldn't find location. Error code: " + status;
    //     }
    //     alert(locationName);
    //     callback(locationName);
    // });
    // console.log(locationName);
  }
  setLocationName(ctr){
    var me = this;
    var geo;
    me.getLocationName(ctr, function(result){
      // return result;
      console.log(result);
        // $("#userLocation").text(result);
        geo =  result;
        // console.log('2');
        // document.getElementById('geolocation').value = me.geolocation;
        // console.log(me.geolocation);
    });

    // setTimeout(function() {
    //   me.geolocation = geo;
    //   console.log('time');
    // }, 5000);
    //
    //
    //
    // console.log(me.geolocation);
    // return me.geolocation;
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
                  document.getElementById('geolocation').value = locationName;
              }
              else {
                  locationName = "Unknown";
              }
          }
          else {
              locationName = "Couldn't find location. Error code: " + status;
          }
          alert(locationName);

          // document.getElementById('geolocation').value = locationName;
          callback(locationName);
      });
  }
}
