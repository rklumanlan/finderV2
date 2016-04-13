import {Page,NavParams, Storage, SqlStorage,IonicApp} from 'ionic-angular';

import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/Rx';


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
    return [[DataService],[ConnectivityService],[IonicApp],[Http]];
  }

  constructor(dataService,connectivityService,app,http){

    this.http = http;


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

    //this.latlng1 = coordinates for point a
    this.latlng1 = null;
    this.points1 = null;

    //this.latlng2 = coordinates for point b
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

  init(options){
    console.log(options.marker_1);

    this.ctr1=options.ctr1;
    this.ctr2=options.ctr2;
    this.ctr3=options.ctr3;
    this.ctr4=options.ctr4;

    this.latlng1 = options.jeep_1;
    this.points1 = options.marker_1;

    console.log(this.points1);


    // var me = this;

    this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivity.isOnline()){
            console.log("online, loading map");
            this.loadGoogleMaps();

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

  loadGoogleMaps(){
    //Load the SDK
    // window.mapInit = function(){
    //     me.initMap();
    //     me.enableMap();
    // }

    var me = this;

    window.mapInit = function(){
      me.initMap();
      console.log('callback map int');
    };

    // let script = document.createElement("script");
    // script.id = "googleMaps";

    //Create a script element to insert into the page
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "googleMaps";

    //Note the callback function in the URL
    script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=mapInit';

    // if(this.apiKey){
    //     script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
    // } else {
    //     script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
    // }

    document.body.appendChild(script);

  }

    // var me = this;
    //
    // this.addConnectivityListeners();
    //
    // if(typeof google == "undefined" || typeof google.maps == "undefined"){
    //
    //     console.log("Google maps JavaScript needs to be loaded.");
    //     this.disableMap();
    //
    //     if(this.connectivity.isOnline()){
    //         console.log("online, loading map");
    //



    // else {
    //
    //     if(this.connectivity.isOnline()){
    //         console.log("showing map");
    //         this.initMap();
    //         this.enableMap();
    //     }
    //     else {
    //         console.log("disabling map");
    //         this.disableMap();
    //     }
    //
    // }

  initMap(){
    console.log(this.points1);
    var me = this;

    var mapOptions = {
        center: {'lat': 15.16829179, 'lng': 151.196532},
        zoom: 14,
        streetViewControl: false,
        mapTypeControl: false

      };
      console.log(this.latlng2!==undefined&&this.ctr1!==undefined&&this.ctr2!==undefined);
      if (this.latlng2!==undefined&&this.ctr1!==undefined&&this.ctr2!==undefined) {
          console.log('map3');
          this.map = new google.maps.Map(document.getElementById('map2'), mapOptions);

      }
      else if (this.ctr1==='1ride'&&(this.ctr2==='forth'||this.ctr2==='back')&&this.latlng2===undefined) {
          console.log('map2');
          this.map = new google.maps.Map(document.getElementById('map2'), mapOptions);

      }
      else if (this.latlng1!==undefined&&this.ctr1===undefined&&this.ctr2===undefined){
          console.log(document.getElementById('map'));
          this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      }

      // var locationControlDiv = document.createElement('div');
      // var locationControl = new SetLocation(locationControlDiv, this.map);
      //
      // locationControlDiv.index = 1;
      // map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationControlDiv);




      this.color1 = me.setColor(this.latlng1.color);


      // Symbol that gets animated along the polyline
      this.lineSymbol1 = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        strokeColor: this.color1,
      };

      // // Symbol that gets animated along the polyline
      // this.lineSymbol2 = {
      //     path: google.maps.SymbolPath.CIRCLE,
      //     scale: 5,
      //     strokeColor: this.color2,
      // };
      // // Symbol that gets animated along the polyline
      // this.lineSymbol3 = {
      //     path: google.maps.SymbolPath.CIRCLE,
      //     scale: 5,
      //     strokeColor: this.color3,
      // };
      // // Symbol that gets animated along the polyline
      // this.lineSymbol4 = {
      //     path: google.maps.SymbolPath.CIRCLE,
      //     scale: 5,
      //     strokeColor: this.color4,
      // };

      google.maps.event.addListenerOnce(this.map, 'idle', function(){
        console.log('maps idle');

        if(me.latlng1!==null){
          console.log('elsee');
            // var colorCode1a = new setColorCode(colorCodeDiv,this.map,this.color1,this.latlng1.name);
            console.log(me.latlng1.coordi);
            me.bendAndSnap(me.latlng1.coordi,'jeep1');

        }

        if(me.latlng1!==null){
            console.log('klk');
          console.log(me.points1);
          var point = me.points1;
          me.loadMarkers(point,null);
        }

        me.enableMap();
      });

  }

  setColor(color){
    switch(color) {
      case 'Lavander':
        return '#8A2BE2';
      case 'Suntan':
        return '#FFFF99';
      case 'Orange':
        return '#FF4500';
      case 'Fire Red':
        return 'maroon';
      default:
        return color;
    }
  }

  getStartEnd(startEnd,ctr){
      console.log(points1);
    if(ctr === 'jeep1'){
      console.log('enter from');
      var string1 = startEnd;
      lat_array_coords1 = string1.split("|");
      console.log(end1Ctr);
      console.log(lat_array_coords1);
      console.log($stateParams.toId);
      console.log(points1.lat+","+points1.lng);

      var startCtr1;
      var endCtr1;

      // if (ctr1==='1ride') {
      //   console.log('1ride iffff');
      //   startCtr1 = getStartPoints(end1Ctr,lat_array_coords1,ctr);
      //   endCtr1 = getEndPoints(points1.lat+","+points1.lng,lat_array_coords1,ctr);
      // }
      // else {
        startCtr1 = getStartPoints(points1.lat+","+points1.lng,lat_array_coords1,ctr);
        endCtr1 = getEndPoints(end1Ctr,lat_array_coords1,ctr);
      // }

      console.log(points1.lat+","+points1.lng);
      console.log(end1Ctr);
      console.log(lat_array_coords1);

      console.log(startCtr1);
      console.log(endCtr1);


      start_new1 = lat_array_coords1[startCtr1];
      console.log(start_new1);
      console.log(ctr1);
      console.log(startCtr1>endCtr1);
      if (startCtr1>endCtr1) {
        console.log('1a');
        console.log((ctr1==='1ride'&&ctr2==='forth'));
          console.log(start_new1);
        for (var j = startCtr1-1; j >= endCtr1; j--) {
            start_new1 += "|"+lat_array_coords1[j];
        }
        if (ctr1==='1ride') {
          console.log('reverse');
          start_new1 = start_new1.split("|").reverse().join("|");
        }
        console.log(start_new1);

      }
      else {
        console.log('2a');
          for (var i = startCtr1+1; i <= endCtr1; i++) {
              start_new1 += "|"+lat_array_coords1[i];
          }
          // if (ctr1==='1ride'&&ctr2==='back'&&(latlng1.name!=='CHECK-POINT-HOLY'||latlng1.name!=='CHECK-POINT-HOLY-HI-WAY'||latlng1.name!=='MARISOL-PAMPANG'||latlng1.name!=='PANDAN-PAMPANG')) {
          //   console.log('rev2');
          //   start_new1.split("|").reverse().join("|");
          // }


      }
      console.log(start_new1);
    }
    if(ctr === 'jeep2'){
      console.log('enter from');
      console.log(points2);
      var string2 = startEnd;
      lat_array_coords2 = string2.split("|");

      console.log(points2.lat+","+points2.lng);
      console.log(end2Ctr);
      console.log(lat_array_coords2);
      var startCtr2 = getStartPoints(points2.lat+","+points2.lng,lat_array_coords2,ctr);
      var endCtr2 = getEndPoints(end2Ctr,lat_array_coords2,ctr);

      console.log('jepp2');
      console.log(startCtr2);
      console.log(endCtr2);
      start_new2 = lat_array_coords2[startCtr2];
      console.log(start_new2);
      console.log(ctr2);
    //   if (ctr2=='forth') {
    //       console.log('enter ctr2');

        if (startCtr2>endCtr2) {
          console.log('123');
            for (var l = startCtr2-1; l >= endCtr2; l--) {
                start_new2 += "|"+lat_array_coords2[l];
            }
            start_new2 = start_new2.split("|").reverse().join("|");
        }
        else {
          console.log('456');
            for (var k = startCtr2+1; k <= endCtr2; k++) {
                start_new2 += "|"+lat_array_coords2[k];
                console.log(start_new2);
            }

        }
        console.log(start_new2);




      }
      if(ctr === 'jeep3'){
        console.log('enter mid3');
        console.log(points3);
        var string3 = startEnd;
        lat_array_coords3 = string3.split("|");

        console.log(points3.lat+","+points3.lng);
        console.log(end3Ctr);
        console.log(lat_array_coords3);
        var startCtr3 = getStartPoints(points3.lat+","+points3.lng,lat_array_coords3,ctr);
        var endCtr3 = getEndPoints(end3Ctr,lat_array_coords3,ctr);
        console.log(startCtr3);
        console.log(endCtr3);


        start_new3 = lat_array_coords3[startCtr3];
        console.log(start_new3);
        if (startCtr3<endCtr3 && start_new3!==undefined) {
          console.log('enter 3if1');
          for (var m = startCtr3+1; m <= endCtr3; m++) {
              start_new3 += "|"+lat_array_coords3[m];
          }
          // start_new3 = start_new3.split("|").reverse().join("|");
          console.log(start_new3);
        }
        else if (startCtr3>endCtr3 && start_new3!==undefined){
          console.log('enter 3if3');
          for (var n = startCtr3-1; n >= endCtr3; n--) {
              start_new3 += "|"+lat_array_coords3[n];
          }
          start_new3 = start_new3.split("|").reverse().join("|");

          console.log('33a');
          console.log(start_new3);
        }
      }
      if(ctr === 'jeep4'){
        console.log('enter mid4');
        console.log(points4);
        var string4 = startEnd;
        lat_array_coords4 = string4.split("|");

        console.log(points4.lat+","+points4.lng);
        console.log(end4Ctr);
        console.log(lat_array_coords4);
        var startCtr4 = getStartPoints(points4.lat+","+points4.lng,lat_array_coords4,ctr);
        var endCtr4 = getEndPoints(end4Ctr,lat_array_coords4,ctr);
        console.log(startCtr4);
        console.log(endCtr4);


        start_new4 = lat_array_coords4[startCtr4];

        if (startCtr4<endCtr4 && start_new4!==undefined) {
          console.log('enter 4if1');
          for (var m = startCtr4+1; m <= endCtr4; m++) {
              start_new4 += "|"+lat_array_coords4[m];
          }
          // start_new4 = start_new4.split("|").reverse().join("|");
          console.log(start_new4);
        }
        else if (startCtr4>endCtr4 && start_new4!==undefined){
          console.log('enter 4if4');
          for (var n = startCtr4-1; n >= endCtr4; n--) {
              start_new4 += "|"+lat_array_coords4[n];
          }
          start_new4 = start_new4.split("|").reverse().join("|");


          console.log(start_new4);
        }
        console.log('ccc');
        console.log(start_new4);
      }


  }

  //match the selected start point to the start point array
  getStartPoints(startpoint,ctr,jeepNo){
    console.log(ctr1);
    console.log(ctr2);
    console.log(jeepNo);
    console.log((ctr2==='forth'||ctr2==='back'));
    // if (latlng3===undefined) {
      console.log('undefined');
      console.log(ctr1);
      console.log(ctr2);
      if ((ctr1=='1ride'&&ctr2=='forth'&&jeepNo==='jeep1')||(ctr1=='forth'&&jeepNo==='jeep1')||(ctr2=='forth'&&jeepNo==='jeep2')||(ctr3=='forth'&&jeepNo==='jeep3')||(ctr4=='forth'&&jeepNo==='jeep4')) {
        console.log('start index of');
        console.log(ctr.indexOf(startpoint));
        return ctr.indexOf(startpoint);
      }
      else if((ctr1=='1ride'&&ctr2=='back'&&jeepNo==='jeep1')||(ctr1=='back'&&jeepNo==='jeep1')||(ctr2=='back'&&jeepNo==='jeep2')||(ctr3=='back'&&jeepNo==='jeep3')||(ctr4=='back'&&jeepNo==='jeep4')){

        console.log('lat3 unde');
          console.log('start last index');
          console.log(ctr);
          console.log(startpoint);
          console.log(ctr.lastIndexOf(startpoint));
          return ctr.lastIndexOf(startpoint);
      }
    // }
    // else if(latlng3!==undefined){
    //   console.log('defined');
    //   if ((ctr1=='forth'&&jeepNo==='jeep1')||(ctr2=='forth'&&jeepNo==='jeep2')||(ctr3=='forth'&&jeepNo==='jeep3')) {
    //     console.log('start last index');
    //     console.log(ctr);
    //     console.log(startpoint);
    //     console.log(ctr.lastIndexOf(startpoint));
    //     console.log(ctr.lastIndexOf(startpoint));
    //     return ctr.lastIndexOf(startpoint);
    //   }
    //   else if(((ctr1=='back'&&jeepNo==='jeep1')||(ctr2=='back'&&jeepNo==='jeep2')||(ctr3=='back'&&jeepNo==='jeep3'))){
    //     console.log(jeepNo);
    //     console.log('start index of');
    //     console.log(startpoint);
    //     console.log(ctr);
    //     console.log(ctr.indexOf(startpoint));
    //     return ctr.indexOf(startpoint);
    //   }
    // }
  }

  //match the selected end point to the end point array
  getEndPoints(endpoint,ctr,jeepNo){

    console.log(endpoint);
    console.log(ctr);
    console.log(ctr1);
    console.log(ctr1=='back'||ctr2=='back'||ctr3=='back');
    console.log(ctr1=='forth'||ctr2=='forth'||ctr3=='forth');

    // if (latlng3===undefined) {
      if((ctr1=='1ride'&&ctr2=='forth'&&jeepNo==='jeep1')||(ctr1=='forth'&&jeepNo==='jeep1')||(ctr2=='forth'&&jeepNo==='jeep2')||(ctr3=='forth'&&jeepNo==='jeep3')||(ctr4=='forth'&&jeepNo==='jeep4')) {
        console.log('end index of');
        console.log(ctr.indexOf(endpoint));
        return ctr.indexOf(endpoint);
      }
      if((ctr1=='1ride'&&ctr2=='back'&&jeepNo==='jeep1')||(ctr1=='back'&&jeepNo==='jeep1')||(ctr2=='back'&&jeepNo==='jeep2')||(ctr3=='back'&&jeepNo==='jeep3')||(ctr4=='back'&&jeepNo==='jeep4')){
          console.log('end last index');
          console.log(ctr);
          console.log(endpoint);
          console.log(ctr.lastIndexOf(endpoint));
          console.log(ctr.lastIndexOf(endpoint));
          return ctr.lastIndexOf(endpoint);
      }
    // }
    // else if (latlng3!==undefined) {
      // if ((ctr1=='1ride'&&ctr2=='forth'&&jeepNo==='jeep1')||(ctr1=='forth'&&jeepNo==='jeep1')||(ctr2=='forth'&&jeepNo==='jeep2')||(ctr3=='forth'&&jeepNo==='jeep3')) {
      //   console.log('end last index');
      //   console.log(ctr);
      //   console.log(endpoint);
      //   console.log(ctr.lastIndexOf(endpoint));
      //   console.log(ctr.lastIndexOf(endpoint));
      //   return ctr.lastIndexOf(endpoint);
      // }
      // else if((ctr1=='1ride'&&ctr2=='back'&&jeepNo==='jeep1')||(ctr1=='back'&&jeepNo==='jeep1')||(ctr2=='back'&&jeepNo==='jeep2')||(ctr3=='back'&&jeepNo==='jeep3')){
      //   console.log('end index of');
      //   console.log(ctr.indexOf(endpoint));
      //   return ctr.indexOf(endpoint);
      // }
    // }


  }

  setColorCode(controlDiv, map,color,jname) {
    var divRow = document.createElement('div');
    divRow.style.backgroundColor = 'rgb(255, 255, 255)';
    divRow.style.maxWidth='100%';
    divRow.style.width='100%';
    divRow.style.textAlign = 'center';
    divRow.className='row';
    controlDiv.appendChild(divRow);

    var divCol = document.createElement('div');
    divCol.style.padding='0px';
    divCol.className='col';
    divRow.appendChild(divCol);

    var canvas = document.createElement('canvas');
    canvas.id = 'colorCanvas';
    canvas.style.height='10px';
    canvas.style.width='10px';
    console.log(color);
    if(color==='White'){
      canvas.style.border='1px solid #000000';
    }
    if(color==='#FFFF99'){
      canvas.style.border='1px solid #000000';
    }

    canvas.style.backgroundColor=color;
    divCol.appendChild(canvas);

    var text = document.createElement('span');

    $translate(jname).then(function(name) {
        text.innerHTML = ' '+name;
    });
    divCol.appendChild(text);

    // var c = document.getElementById("colorCanvas");
    // var ctx = c.getContext("2d");
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(20, 20, 150, 100);


  }

  SetLocation(controlDiv, map) {
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'rgb(255, 255, 255)';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 1px 4px -1px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to get location';
    controlUI.style.marginRight = '10px';
    controlDiv.appendChild(controlUI);


    var controlButton = document.createElement('div');
    controlButton.className='sprite';
    controlUI.appendChild(controlButton);

    controlUI.addEventListener('click', function() {


      // onSuccess Callback This method accepts a `Position` object, which contains the current GPS coordinates
      function onSuccess(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            if ( marker ) {
              marker.setMap(map);
              map.setCenter(pos);
            } else {
              marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: 'https://maps.gstatic.com/mapfiles/maps_lite/images/1x/ic_my_location_24dp.png'
              });
              map.setCenter(pos);
            }

      }

      // onError Callback receives a PositionError object
      //
      function onError(error) {
        onSuccess();
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      // Options: throw an error if no update is received every 30 seconds.
      //
      var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000, maximumAge:600000, enableHighAccuracy: false});
    });

  }

  bendAndSnap(latlngs,ctr) {
    var me = this;
    console.log('bend');

    // var me = this;
      // console.log(latlngs);
    this.coords = latlngs;

    var asd;
    console.log(this.apiKey);

    var creds = JSON.stringify({ interpolate: true, key: this.apiKey, path: this.coords});

    let params = new URLSearchParams();
		params.set('interpolate', true);
		params.set('key', this.apiKey);
		params.set('path', this.coords);

    this.http.get('https://roads.googleapis.com/v1/snapToRoads',{search: params})
    .subscribe(
      data => {
        if(ctr == 'jeep1'){
        console.log('enter from');
        me.processSnapToRoadResponse(data.json(),'jeep1');
        me.drawSnappedPolyline(this.snappedCoordinates1,'jeep1');
      }

      if(ctr=='jeep2'){
        console.log(response.data);
        console.log('enter to');
        me.processSnapToRoadResponse(data.json(),'jeep2');
        me.drawSnappedPolyline(this.snappedCoordinates2,'jeep2');
      }


      if(ctr=='jeep3'){
        console.log(response.data);
        console.log('enter mid');
        me.processSnapToRoadResponse(data.json(),'jeep3');
        me.drawSnappedPolyline(this.snappedCoordinates3,'jeep3');
      }


      if(ctr=='jeep4'){
        console.log(response.data);
        console.log('enter 4');
        me.processSnapToRoadResponse(data.json(),'jeep4');
        me.drawSnappedPolyline(this.snappedCoordinates4,'jeep4');
      }

      else {
          console.log('default');
        me.processSnapToRoadResponse(data.json(),null);
        me.drawSnappedPolyline(this.snappedCoordinates1,null);
      }

          console.log(data.json());
          me.fitBounds(this.markers);

      },
      err => console.log(err)
    );

    // $http({
    //   method: 'GET',
    //   url: 'https://roads.googleapis.com/v1/snapToRoads',
    //   params: {
    //     interpolate: true,
    //     key: API_KEY,
    //     path: coords,
    //   }
    // })
    // .then(function successCallback(response) {
    //
    //   if(ctr == 'jeep1'){
    //     console.log('enter from');
    //     processSnapToRoadResponse(response.data,'jeep1');
    //     drawSnappedPolyline(snappedCoordinates1,'jeep1');
    //   }
    //
    //   if(ctr=='jeep2'){
    //     console.log(response.data);
    //     console.log('enter to');
    //     processSnapToRoadResponse(response.data,'jeep2');
    //     drawSnappedPolyline(this.snappedCoordinates2,'jeep2');
    //   }
    //
    //
    //   if(ctr=='jeep3'){
    //     console.log(response.data);
    //     console.log('enter mid');
    //     processSnapToRoadResponse(response.data,'jeep3');
    //     drawSnappedPolyline(snappedCoordinates3,'jeep3');
    //   }
    //
    //
    //   if(ctr=='jeep4'){
    //     console.log(response.data);
    //     console.log('enter 4');
    //     processSnapToRoadResponse(response.data,'jeep4');
    //     drawSnappedPolyline(snappedCoordinates4,'jeep4');
    //   }
    //
    //   else {
    //       console.log('default');
    //     processSnapToRoadResponse(response.data,null);
    //     drawSnappedPolyline(snappedCoordinates1,null);
    //   }
    //
    //
    //   fitBounds(markers);
    // },
    // function errorCallback(response) {
    //   console.log(response);
    // });
  }


  // Parse response from snapToRoads API request
  // Store all coordinates in response
  // Calls functions to add markers to map for unsnapped coordinates
  processSnapToRoadResponse(data,ctr) {
    var originalIndexes = [];
    this.snappedCoordinates1 = [];
    var originalIndexes2 = [];
    this.snappedCoordinates2 = [];
    var originalIndexes3 = [];
    this.snappedCoordinates3 = [];
    var originalIndexes4 = [];
    this.snappedCoordinates4 = [];
    if(ctr == 'jeep1'){
      console.log('process from');
      for (var i = 0; i < data.snappedPoints.length; i++) {
        var latlng1 = {
          'lat': data.snappedPoints[i].location.latitude,
          'lng': data.snappedPoints[i].location.longitude
        };
        var interpolated1 = true;

        if (data.snappedPoints[i].originalIndex !== undefined) {
          interpolated1 = false;
          originalIndexes.push(data.snappedPoints[i].originalIndex);
          latlng1.originalIndex = data.snappedPoints[i].originalIndex;
        }

        latlng1.interpolated = interpolated1;
        this.snappedCoordinates1.push(latlng1);
      }
    }
    if(ctr=='jeep2'){
      console.log('process to');
      for (var j = 0; j < data.snappedPoints.length; j++) {
        var latlng2 = {
          'lat': data.snappedPoints[j].location.latitude,
          'lng': data.snappedPoints[j].location.longitude
        };
        var interpolated2 = true;

        if (data.snappedPoints[j].originalIndex !== undefined) {
          interpolated2 = false;
          originalIndexes.push(data.snappedPoints[j].originalIndex);
          latlng2.originalIndex = data.snappedPoints[j].originalIndex;
        }

        latlng2.interpolated = interpolated2;
        this.snappedCoordinates2.push(latlng2);
      }
    }
    if(ctr=='jeep3'){
      console.log('process to');
      for (var k = 0; k < data.snappedPoints.length; k++) {
        var latlng3 = {
          'lat': data.snappedPoints[k].location.latitude,
          'lng': data.snappedPoints[k].location.longitude
        };
        var interpolated3 = true;

        if (data.snappedPoints[k].originalIndex !== undefined) {
          interpolated3 = false;
          originalIndexes.push(data.snappedPoints[k].originalIndex);
          latlng3.originalIndex = data.snappedPoints[k].originalIndex;
        }

        latlng3.interpolated = interpolated3;
        this.snappedCoordinates3.push(latlng3);
      }
    }
    if(ctr=='jeep4'){
      console.log('process to');
      for (var l = 0; l < data.snappedPoints.length; l++) {
        var latlng4 = {
          'lat': data.snappedPoints[l].location.latitude,
          'lng': data.snappedPoints[l].location.longitude
        };
        var interpolated4 = true;

        if (data.snappedPoints[l].originalIndex !== undefined) {
          interpolated4 = false;
          originalIndexes.push(data.snappedPoints[l].originalIndex);
          latlng4.originalIndex = data.snappedPoints[l].originalIndex;
        }

        latlng4.interpolated = interpolated4;
        this.snappedCoordinates4.push(latlng4);
        console.log(this.snappedCoordinates4);
      }
    }



  }



  // Draw the polyline for the snapToRoads API response
  drawSnappedPolyline(snappedCoords,ctr) {

    var me = this;



    if(ctr =='jeep1'){
        console.log(snappedCoords);
      this.snappedPolyline1 = new google.maps.Polyline({
        path: snappedCoords,
        strokeColor: 'turquoise',
        strokeWeight: 5,
        icons: [{
          icon: this.lineSymbol1,
          offset: '100%'
        }]
      });

      this.snappedPolyline1.setMap(this.map);
      console.log(this.snappedPolyline1);
      me.animateCircle(this.snappedPolyline1);

      this.polylines1.push(this.snappedPolyline1);
      console.log(this.polylines1);
      console.log('draw from');
    }
    // if(ctr=='jeep2'){
    //   console.log('draw to');
    //   console.log(snappedCoords);
    //   snappedPolyline2 = new google.maps.Polyline({
    //     path: snappedCoords,
    //     strokeColor: '#FF69B4',
    //     strokeWeight: 5,
    //     icons: [{
    //       icon: lineSymbol2,
    //       offset: '100%'
    //     }]
    //   });
    //
    //   snappedPolyline2.setMap(map);
    //   animateCircle(snappedPolyline2);
    //
    //   polylines2.push(snappedPolyline2);
    //   console.log(polylines2);
    // }
    // if(ctr=='jeep3'){
    //   console.log('draw mid');
    //   console.log(snappedCoords);
    //   snappedPolyline3 = new google.maps.Polyline({
    //     path: snappedCoords,
    //     strokeColor: '#98FB98',
    //     strokeWeight: 5,
    //     icons: [{
    //       icon: lineSymbol3,
    //       offset: '100%'
    //     }]
    //   });
    //
    //   snappedPolyline3.setMap(map);
    //   animateCircle(snappedPolyline3);
    //
    //   polylines3.push(snappedPolyline3);
    //   console.log(polylines3);
    // }
    // if(ctr=='jeep4'){
    //   console.log('draw 4');
    //   console.log(snappedCoords);
    //   snappedPolyline4 = new google.maps.Polyline({
    //     path: snappedCoords,
    //     strokeColor: '#FF00FF',
    //     strokeWeight: 5,
    //     icons: [{
    //       icon: lineSymbol4,
    //       offset: '100%'
    //     }]
    //   });
    //
    //   snappedPolyline4.setMap(map);
    //   animateCircle(snappedPolyline4);
    //
    //   polylines4.push(snappedPolyline4);
    //   console.log(polylines4);
    // }

    for (var i = 0; i < snappedCoords.length; i++) {
      var marker = me.addMarker(snappedCoords[i]);
    }




  }

  //add marker for fitBounds()
  addMarker(coords,ctr) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.map,
    });
    marker.setMap(null);
    this.markers.push(marker);

    return marker;
  }

  //load markers for the landmarks
  loadMarkers(points,points2){
    var me = this;

console.log(points2);
    console.log(points);
    console.log('lll');
      var records;
      if (points2!==null) {
        records = [{lat:points.lat,lng:points.lng,text:points.text},{lat:points2.lat,lng:points2.lng,text:points2.text}];
      }
      else {
        records = points;
      }

      console.log(records);

      for (var x = 0; x < records.length; x++) {
        var markerPos = new google.maps.LatLng(records[x].lat,records[x].lng);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: markerPos
        });
        var infoWindowContent;
        if (points2!==null) {
          infoWindowContent = records[x].text;
          me.addInfoWindow(marker, infoWindowContent);
        }
        else{
          infoWindowContent = points[x].text;
          me.addInfoWindow(marker, infoWindowContent);
        }
      }
    //
    // }





  }

  //display info about the markers
  addInfoWindow(marker, message) {
      // $translate(message).then(function(mess) {
        var point_title = "<h4>"+message+"</h4>";
        var infoWindow = new google.maps.InfoWindow({
            content: point_title
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(this.map, marker);
        });
      // });

  }

  //Animate an icon along a polyline
  animateCircle(polyline) {
    var count = 0;
    var defaultIcon = [
      {
        icon: this.lineSymbol1,
        offset: '100%'
      }
    ];

    window.setInterval(function() {
      count = (count + 0.7) % 200;
      var icons = polyline.get('icons') || defaultIcon;
      icons[0].offset = (count / 2) + '%';
      polyline.set('icons', icons);
    }, 20);
  }

  //Fit the map bounds to the current set of markers
  fitBounds(markers) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
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
