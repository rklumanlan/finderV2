import {Page, NavParams, NavController} from 'ionic-angular';
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

  onPageDidEnter() {
    console.log('ssss');
    this.lat();
  }
  autocomplete(searchbar){
    console.log('lll');
    var me = this;

    // console.log(document.getElementById('geo'));
    // console.log(new google.maps.places);
    var input = document.getElementById('geolocation').getElementsByTagName('input')[0];
    // console.log(new google.maps.places.Autocomplete(document.getElementById('geo')));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
         var place = autocomplete.getPlace();
         console.log(place);
         // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          // if (componentForm[addressType]) {
          //   var val = place.address_components[i][componentForm[addressType]];
          //   document.getElementById(addressType).value = val;
          // }
          console.log(addressType);
        }
    });
  }

  showlatlong(event) {
    var me = this;
    var geoCoords = {};

    console.log("geolocation working");
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords.lat = position.coords.latitude;
            geoCoords.long = position.coords.longitude;
            // me.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(geoCoords);
             me.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation = locName;

             geoCoords.locName = locName;

               setTimeout(function() {
                 me.nav.push(MainPage, { geoloc: geoCoords });
               }, 6000);
               console.log(me.geolocation);
              });
        },

        (error) => {
            console.log(error);
        }, options

      );

  }

}
