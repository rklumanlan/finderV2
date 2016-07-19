import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

/*
  Generated class for the HotelMapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/hotel-map/hotel-map.html',
  providers: [GeolocationService]
})
export class HotelMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;

    this.HotelMapPage = HotelMapPage;

    this.item_coordinates_hotel = this.navParams.get('item_coordinates_hotel');
    console.log(this.item_coordinates_hotel.name);
  }
  ionViewDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates_hotel,'hotel');
  }
}
