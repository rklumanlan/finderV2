import {Page,NavParams, Storage, SqlStorage,IonicApp} from 'ionic-angular';

import {Injectable} from 'angular2/core';

import {DataService} from '../../services/data';

import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';

// import {LoadingModal} from '../../components/loading-modal/loading-modal';
//
// @Page({
//   templateUrl: 'build/pages/maps/maps.html',
//   directives: [LoadingModal],
// })

@Injectable()
export class GoogleMapsService {

  static get parameters(){
    return [[DataService],[ConnectivityService],[IonicApp]];
  }

  constructor(dataService,connectivityService,app){

    this.loading = app.getComponent('loading');
    // this.loading.show();
    // console.log(this.loading);

    // this.MapsPage = MapsPage;
    this.dataService = dataService;
    // this.navParams = navParams;
    //
    // this.details = navParams.get('jeep');
    // console.log(this.details);

    this.connectivity = connectivityService;

    this.map = null;
    this.mapInitialised = false;
    this.apiKey = 'AIzaSyD4zGo9cejtd83MbUFQL8YU71b8_A5XZpc';


    this.coords = null;
    this.interpolate = true;
    this.map;



    //fit markers to screen
    this.markers = [];

    //array for point a or display jeepney route
    this.polylines1 = [];
    this.snappedCoordinates1 = [];
    this.lineSymbol1 = null;

    //array for point b
    this.polylines2 = [];
    this.snappedCoordinates2 = [];
    this.lineSymbol2 = null;

    //array for pointc
    this.polylines3 = [];
    this.snappedCoordinates3 = [];
    this.lineSymbol3 = null;

    //array for pointd
    this.polylines4 = [];
    this.snappedCoordinates4 = [];
    this.lineSymbol4 = null;

    //latlng1 = coordinates for point a
    this.latlng1 = null;
    this.points1 = null;

    //latlng2 = coordinates for point b
    this.latlng2 = null;
    this.points2 = null;


    //latlng3 = coordinates for point c
    this.latlng3 = null;
    this.points3 = null;

    //latlng3 = coordinates for point c
    this.latlng4 = null;
    this.points4 = null;

    //color of the jeep
    this.color1 = null;
    this.color2 = null;
    this.color3 = null;
    this.color4 = null;

    this.start_new1 = null;
    this.start_new2 = null;
    this.start_new3 = null;
    this.start_new4 = null;

    this.end1Ctr = null;
    this.end2Ctr = null;
    this.end3Ctr = null;
    this.end4Ctr = null;

    this.marker = null;

    this.lat_array_coords1 = null;
    this.lat_array_coords2 = null;
    this.lat_array_coords3 = null;
    this.lat_array_coords4 = null;

    this.snappedPolyline1 = null;
    this.snappedPolyline2 = null;
    this.snappedPolyline3 = null;
    this.snappedPolyline4 = null;
    this.ctr1 = null;
    this.ctr2 = null;
    this.ctr3 = null;
    this.ctr4 = null;

    // this.showLoader();
    // this.loadGoogleMaps();
  }

  loadGoogleMaps(){

    var me = this;

    this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivity.isOnline()){
            console.log("online, loading map");

            //Load the SDK
            window.mapInit = function(){
                me.initMap();
                me.enableMap();
            }

            let script = document.createElement("script");
            script.id = "googleMaps";

            if(this.apiKey){
                script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
            } else {
                script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
            }

            document.body.appendChild(script);

        }
    }
    else {

        if(this.connectivity.isOnline()){
            console.log("showing map");
            this.initMap();
            this.enableMap();
        }
        else {
            console.log("disabling map");
            this.disableMap();
        }

    }

  }

  initMap(){

    this.mapInitialised = true;

    navigator.geolocation.getCurrentPosition( (position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    }, (error) => {
        console.log(error);
    });

  }

  disableMap(){
    console.log("disable map");
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners(){
    var me = this;

    var onOnline = function(){
        setTimeout(function(){
            if(typeof google == "undefined" || typeof google.maps == "undefined"){
                me.loadGoogleMaps();
            } else {
                if(!me.mapInitialised){
                    me.initMap();
                }

                me.enableMap();
            }
        }, 2000);
    };

    var onOffline = function(){
        me.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }
}
