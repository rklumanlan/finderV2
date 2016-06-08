import {Page, NavParams, NavController, Alert} from 'ionic-angular';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {MainPage} from '../main/main';
// import {RestaurantPage} from '../restaurant/restaurant';
/*
  Generated class for the LandingpagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/landingpage/landingpage.html',
  providers: [GeolocationService]
})
export class LandingPage {
  static get parameters() {
    return [[GeolocationService],[NavParams],[NavController]];
  }

  constructor(geolocationService,navParams,nav) {
    this.MainPage = MainPage;
    this.geolocationService = geolocationService;
    this.navParams = navParams;
    this.nav = nav;

    this.geolocation = '';
  }

  autocomplete(searchbar){
    var me = this;
    me.geolocationService.autoComplete('landingpage');
  }

  showlatlong(event) {
    var me = this;
    var geoCoords = {};

    document.getElementById('lndBtnLoc').style.display = "none";
    document.getElementById('lndLoaderLoc').style.display = "inline";

    console.log("geolocation working");

    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords.lat = position.coords.latitude;
            geoCoords.lng = position.coords.longitude;
            // me.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(geoCoords);
             me.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation = locName;

             geoCoords.locationName = locName;

               setTimeout(function() {
                 me.nav.push(MainPage, { geoloc: geoCoords });
               }, 2000);
               console.log(me.geolocation);
              });
        },

        (error) => {
            console.log(error);
            me.locErrMsg();
        });

  }

  locErrMsg(){
    let alert = Alert.create({
      title: 'No location found',
      subTitle: 'Please enable your GPS location.',
      buttons: [{
        text: 'OK',
        handler: data => {
          this.nav.pop();
        }
      }]
    });
    this.nav.present(alert);
    document.getElementById('lndBtnLoc').style.display = "inline";
    document.getElementById('lndLoaderLoc').style.display = "none";
  }


}
