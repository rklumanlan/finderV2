import {Page, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
// import {GoogleMapsService} from '../../providers/google-maps-service/google-maps-service';
// import {DataService} from '../../../services/data';
// import {LoadingModal} from '../../components/loading-modal/loading-modal';

/*
  Generated class for the RestaurantPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/restaurant/restaurant.html',
  // directives: [LoadingModal],
  // providers: [GoogleMapsService]
})
export class RestaurantPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.RestaurantPage = RestaurantPage;
    this.coordsVal = null;
    this.map = null;
    this.loadMap();
  }

  //show map
  loadMap(){
    console.log("Map loaded");
	//let options = {timeout 10000, enableHighAccuracy: true};


}
  showlatlong(event) {
      console.log("geolocation working");

      Geolocation.getCurrentPosition().then((resp) => {
       //resp.coords.latitude
       //resp.coords.longitude
      })

      let watch = Geolocation.watchPosition();
      watch.subscribe((data) => {
       //data.coords.latitude
       //data.coords.longitude
      })

      // onSuccess Callback
      //   This method accepts a `Position` object, which contains
      //   the current GPS coordinates
      //
      function onSuccess(position) {
          var element = document.getElementById('geolocation');
          //element.innerHTML =  position.coords.latitude  + ',' + position.coords.longitude;

          this.coordsVal = position.coords.latitude  + ',' + position.coords.longitude;

          console.log(this.coordsVal);
         //var element = document.getElementById("geolocation").value= (position.coords.latitude  + ',' + position.coords.longitude);
       }


      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      // Options: throw an error if no update is received every 30 seconds.
      //
      var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });

  }

}
