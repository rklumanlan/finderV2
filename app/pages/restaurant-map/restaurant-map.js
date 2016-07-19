import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
// import {RestaurantDetailsPage} from '../restaurant-details/restaurant-details';
/*
  Generated class for the RestaurantMapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
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

    this.item_coordinates = this.navParams.get('item_coordinates');
    console.log(this.item_coordinates.geometry.location);
  }

  ionViewDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates,'resto');
  }
}
