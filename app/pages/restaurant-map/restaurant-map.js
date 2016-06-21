import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
// import {RestaurantDetailsPage} from '../restaurantmap/restaurantmap';
/*
  Generated class for the RestaurantMapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/restaurant-map/restaurant-map.html',
  providers: [GeolocationService]
})
export class RestaurantMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;
  }
  onPageDidEnter(){
    this.geolocationService.getPolHosp(this.poldetail,'resto');
  }
}
