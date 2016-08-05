import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

@Component({
  templateUrl: 'build/pages/supermarket-map/supermarket-map.html',
  providers: [GeolocationService]
})
export class SupermarketMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;

    this.SupermarketMapPage = SupermarketMapPage;

    this.item_coordinates_supmarket = this.navParams.get('item_coordinates_supmarket');
    console.log(this.item_coordinates_supmarket.name);
  }
  ionViewDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates_supmarket,'supermarket');
  }
}
