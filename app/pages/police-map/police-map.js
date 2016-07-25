import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
/*
  Generated class for the MallMapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/police-map/police-map.html',
  providers: [GeolocationService]
})
export class PoliceMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;

    this.MallMapPage = PoliceMapPage;

    this.item_coordinates_police = this.navParams.get('item_coordinates_police');
    console.log(this.item_coordinates_police.name);
  }
  ionViewDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates_police,'police');
  }
}
