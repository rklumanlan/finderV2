import {Page, Storage, SqlStorage, NavParams, NavController} from 'ionic-angular';
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

// import {GoogleMapsService} from '../../providers/google-maps-service/google-maps-service';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

@Page({
  templateUrl: 'build/pages/main/main.html',
  providers: [GeolocationService]

})

export class MainPage{
  static get parameters(){
    return [[DataService],[GeolocationService],[NavParams],[NavController]];
  }
  constructor(dataService,geolocationService,navParams,nav) {
    //database service
    this.dataService = dataService;
    this.geolocationService = geolocationService;
    this.navParams = navParams;
    this.nav = nav;
    this.TabsPage = TabsPage;
    // menu pages
    this.RestaurantPage = RestaurantPage;
    this.HotelsPage = HotelsPage;
    this.MallsPage = MallsPage;
    this.SupermarketsPage = SupermarketsPage;
    this.SalonsPage = SalonsPage;
    this.PolicePage = PolicePage;
    this.HopitalsPage = HospitalsPage;

    this.details = navParams.get('geoloc');
    console.log(this.details);

    this.geolocation2 = this.details.locName;


  }
  showlatlong(event) {
    var me = this;
    var geoCoords2 = {};

    console.log("geolocation working");
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords2.lat = position.coords.latitude;
            geoCoords2.long = position.coords.longitude;
            // me.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(gCoords);
             me.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation2 = locName;

             });
        },

        (error) => {
            console.log(error);
        }, options

      );

  }

  nextPage(ctr){
    var ctr;
    var me = this;
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    if(ctr == 'resto'){
      this.nav.push( RestaurantPage, {geoloc: me.details} );
    }
    else if(ctr == 'hotels'){
      this.nav.push( HotelsPage );
    }
    else if(ctr == 'malls'){
      this.nav.push( MallsPage );
    }
    else if(ctr == 'supermarkets'){
      this.nav.push( SupermarketsPage );
    }
    else if(ctr == 'salons'){
      this.nav.push( SalonsPage );
    }
    else if(ctr == 'police'){
      this.nav.push( PolicePage );
    }
    else if(ctr == 'hospitals'){
      this.nav.push( HospitalsPage );
    }
    else{
      return;
    }
  }

}
