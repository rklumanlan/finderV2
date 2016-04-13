import {Page,NavParams, Storage, SqlStorage,IonicApp} from 'ionic-angular';

import {DataService} from '../../../services/data';

import {ConnectivityService} from '../../../providers/connectivity-service/connectivity-service';

import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';

import {LoadingModal} from '../../../components/loading-modal/loading-modal';


@Page({
  templateUrl: 'build/pages/maps/maps.html',
  directives: [LoadingModal],
})

export class JeepMapsPage {
  static get parameters(){
    return [[DataService],[NavParams],[ConnectivityService],[IonicApp],[GoogleMapsService]];
  }
  constructor(dataService,navParams,connectivityService,app,googleMapsService){

    // this.googleMapsService = googleMapsService;
    //
    // this.googleMapsService.loadGoogleMaps();

    // this.passJeepParams();

    // this.loading = app.getComponent('loading');
    // // this.loading.show();
    // // console.log(this.loading);
    //
    // // this.MapsPage = MapsPage;
    this.dataService = dataService;
    this.googleMapsService = googleMapsService;
    this.navParams = navParams;
    //
    this.jeep= navParams.get('jeep');
    console.log(this.jeep);


    this.options = {};

    // this.jeepDetails = null;
    this.points = [];
    this.dataService.getPoints().then((data) => {
      // console.log(data);
      // this.points = data.res.rows[0];
      // console.log(this.points);

      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {


          if (this.check_marks(data.res.rows.item(i).tags,this.jeep.name)) {
            this.points.push({text: data.res.rows.item(i).text, lat: data.res.rows.item(i).lat, lng:data.res.rows.item(i).lng, tags:data.res.rows.item(i).tags});
          }
        }
      }
      console.log(this.points);
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

    this.options.jeep_1 = this.jeep;
    this.options.marker_1 = this.points;

    this.googleMapsService.init(this.options);

    // this.dataService.getJeepDetails(this.details).then((data) => {
    //   // console.log(data);
    //   this.jeepDetails = data.res.rows[0];
    //   console.log(this.jeepDetails);
    // }, (error) => {
    //   console.log("ERROR -> " + JSON.stringify(error.err));
    // });

    //
    // console.log(options);
    // var data = getJeepDocs($stateParams.jeepId)
    //   .then(function(result) {
    //     options.jeep_1 = result;
    //     console.log(result);
    //   });
    // var pointMarker = getJeepMarkers($stateParams.jeepId).then(function(result) {
    //   options.marker_1 = result;
    //   console.log(result);
    // });
    // pointMarker.then(function(result) {
    //   console.log(result);
    //   GoogleMaps.init(options);
    // });

    //
    // this.connectivity = connectivityService;
    //
    // this.map = null;
    // this.mapInitialised = false;
    // this.apiKey = null;



    // this.showLoader();
    // this.loadGoogleMaps();

    // this.details = navParams.get('jeep')
    //
    // this.jeepDetails = [];
    // console.log(this.details.name);
    //
    // this.dataService.getJeepDetails(this.details.name).then((data) => {
    //   this.jeepDetails = data.res.rows[0];
    //   console.log(this.jeepDetails);
    // }, (error) => {
    //   console.log("ERROR -> " + JSON.stringify(error.err));
    // });
  }

check_marks(a,b){
    // if (a!==undefined) {
      var string1 = a;
      var ab = string1.split(",");


      if (ab.indexOf(b)!=-1) {
        return true;
      }
      // else {
      //   return true;
      // }
      // else {
      //   return;
      // }
  // }
}

//   showLoader(){
// console.log('loader'+this.loading);
//         this.loading.show();
//
//         if (this.map !=null) {
//           this.loading.hide();
//         }
//         // setTimeout(() => {
//         //
//         // }, 4000);
//     }
//
//
//   loadGoogleMaps(){
//
//     var me = this;
//
//     this.addConnectivityListeners();
//
//     if(typeof google == "undefined" || typeof google.maps == "undefined"){
//
//         console.log("Google maps JavaScript needs to be loaded.");
//         this.disableMap();
//
//         if(this.connectivity.isOnline()){
//             console.log("online, loading map");
//
//             //Load the SDK
//             window.mapInit = function(){
//                 me.initMap();
//                 me.enableMap();
//             }
//
//             let script = document.createElement("script");
//             script.id = "googleMaps";
//
//             if(this.apiKey){
//                 script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
//             } else {
//                 script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
//             }
//
//             document.body.appendChild(script);
//
//         }
//     }
//     else {
//
//         if(this.connectivity.isOnline()){
//             console.log("showing map");
//             this.initMap();
//             this.enableMap();
//         }
//         else {
//             console.log("disabling map");
//             this.disableMap();
//         }
//
//     }
//
//   }
//
//   initMap(){
//
//     this.mapInitialised = true;
//
//     navigator.geolocation.getCurrentPosition( (position) => {
//
//         let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//
//         let mapOptions = {
//           center: latLng,
//           zoom: 15,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
//
//         this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
//     }, (error) => {
//         console.log(error);
//     });
//
//   }
//
//   disableMap(){
//     console.log("disable map");
//   }
//
//   enableMap(){
//     console.log("enable map");
//   }
//
//   addConnectivityListeners(){
//     var me = this;
//
//     var onOnline = function(){
//         setTimeout(function(){
//             if(typeof google == "undefined" || typeof google.maps == "undefined"){
//                 me.loadGoogleMaps();
//             } else {
//                 if(!me.mapInitialised){
//                     me.initMap();
//                 }
//
//                 me.enableMap();
//             }
//         }, 2000);
//     };
//
//     var onOffline = function(){
//         me.disableMap();
//     };
//
//     document.addEventListener('online', onOnline, false);
//     document.addEventListener('offline', onOffline, false);
//
//   }


}
