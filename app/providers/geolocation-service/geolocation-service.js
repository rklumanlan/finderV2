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
  }

  loadGeolocation(ctr){
    var me = this;

    // me.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");


        if(me.connectivity.isOnline()){
            console.log("online, loading map");

            //Load the SDK
            window.mapInit = function(){
                return me.initMap(ctr);
                // me.enableMap();
            }

            let script = document.createElement("script");
            script.id = "googleMaps";

            // if(me.apiKey){
                script.src = 'https://maps.googleapis.com/maps/api/js?key='+me.apiKey +'&callback=mapInit';
            // } else {
            //     script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
            // }

            document.body.appendChild(script);

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
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var input = ctr;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          return results[1].formatted_address;
          // map.setZoom(11);
          // var marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map
          // });
          // infowindow.setContent(results[1].formatted_address);
          // infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
