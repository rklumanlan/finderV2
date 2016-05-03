import {Page, Storage, SqlStorage} from 'ionic-angular';
import {TabsPage} from '../jeepney/tabs/tabs';
// Import menu pages
import {RestaurantPage} from '../restaurant/restaurant';
import {HotelsPage} from '../hotels/hotels';
import {MallsPage} from '../malls/malls';
import {SupermarketsPage} from '../supermarkets/supermarkets';
import {SalonsPage} from '../salons/salons';
import {PolicePage} from '../police/police';
import {HospitalsPage} from '../hospitals/hospitals';
// Import menu pages until here
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
    // menu pages
    this.RestaurantPage = RestaurantPage;
    this.HotelsPage = HotelsPage;
    this.MallsPage = MallsPage;
    this.SupermarketsPage = SupermarketsPage;
    this.SalonsPage = SalonsPage;
    this.PolicePage = PolicePage;
    this.HopitalsPage = HospitalsPage;
    // menu pages until here
    this.coordsVal = null;
    
    this.geolocation = '';

  }


  showlatlong(event) {
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
            // me.geolocation = me.geolocationService.loadGeolocation(geoCoords);
            // me.geolocation = me.geolocationService.setLocationName(geoCoords);
             me.geolocationService.setLocationName(geoCoords).then(function(v) { // `delay` returns a promise
                console.log(v); // Log the value once it is resolved
                me.geolocation = v;
              });



        },

        (error) => {
            console.log(error);
        }, options

    );


    // this.geolocationService.getLocationName(latitude, longitude, function(result){
    //     $("#userLocation").text(result);
    // });


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
