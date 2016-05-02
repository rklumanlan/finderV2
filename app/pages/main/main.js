import {Page, Storage, SqlStorage} from 'ionic-angular';
import {TabsPage} from '../jeepney/tabs/tabs';
// import {RestaurantPage} from '../restaurant/restaurant';
import {DataService} from '../../services/data';
// import {Geolocation} from 'ionic-native';

import {GoogleMapsService} from '../../providers/google-maps-service/google-maps-service';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

@Page({
  templateUrl: 'build/pages/main/main.html',
  providers: [GoogleMapsService,GeolocationService]

})

export class MainPage {
  static get parameters(){
    return [[DataService],[GoogleMapsService],[GeolocationService]];
  }
  constructor(dataService,googleMapsService,geolocationService) {
    //database service
    this.dataService = dataService;
    this.googleMapsService = googleMapsService;
    this.geolocationService = geolocationService;

        // this.dataService.insertJeepsData();
        //     this.dataService.insertPointsData();


    this.TabsPage = TabsPage;
    this.geolocation = '';
    // this.RestaurantPage = RestaurantPage;
    // this.loadscript();


  }


  showlatlong(event) {
    // this.val ='ss';
    // this.val = this.googleMapsService.loadGoogleMaps();

    var me = this;
    var geoCoords;
    console.log("geolocation working");
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(

        (position) => {
            // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //
            // let mapOptions = {
            //     center: latLng,
            //     zoom: 15,
            //     mapTypeId: google.maps.MapTypeId.ROADMAP
            // }
            //
            // this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            // this.coordsVal = position.coords.latitude  + ',' + position.coords.longitude;
            // me.coordsVal.geoLat = position.coords.latitude;
            // me.coordsVal.geoLng = position.coords.longitude;
            geoCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(position.coords.latitude  + ',' + position.coords.longitude);

            this.geolocationService.loadGeolocation(geoCoords);
        },

        (error) => {
            console.log(error);
        }, options

    );
    // me.googleMapsService.loadGoogleMaps(me.coordsVal);


//     Geolocation.getCurrentPosition().then((resp) => {
//      //resp.coords.latitude
//      //resp.coords.longitude
//     })
//
//     let watch = Geolocation.watchPosition();
//     watch.subscribe((data) => {
//      //data.coords.latitude
//      //data.coords.longitude
//     })
//
//     // onSuccess Callback
//     //   This method accepts a `Position` object, which contains
//     //   the current GPS coordinates
//     //
//     function onSuccess(position) {
//         var element = document.getElementById('geolocation');
//         //element.innerHTML =  position.coords.latitude  + ',' + position.coords.longitude;
//
//         this.coordsVal = position.coords.latitude  + ',' + position.coords.longitude;
//
//         console.log(this.coordsVal);
      //  var element = document.getElementById("geolocation").value= (position.coords.latitude  + ',' + position.coords.longitude);
// }
//
//
//     // onError Callback receives a PositionError object
//     //
//     function onError(error) {
//         alert('code: '    + error.code    + '\n' +
//               'message: ' + error.message + '\n');
//     }
//
//     // Options: throw an error if no update is received every 30 seconds.
//     //
//     var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });

  }


}
