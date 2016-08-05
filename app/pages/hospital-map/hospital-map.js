import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

@Component({
  templateUrl: 'build/pages/hospital-map/hospital-map.html',
  providers: [GeolocationService]
})
export class HospitalMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;

    this.HospitalMapPage = HospitalMapPage;

    this.item_coordinates_hospital = this.navParams.get('item_coordinates_hospital');
    console.log(this.item_coordinates_hospital.name);
  }
  ionViewDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates_hospital,'hospital');
  }
}


// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
//
// /*
//   Generated class for the HospitalMapPage page.
//
//   See http://ionicframework.com/docs/v2/components/#navigation for more info on
//   Ionic pages and navigation.
// */
// @Component({
//   templateUrl: 'build/pages/hospital-map/hospital-map.html',
// })
// export class HospitalMapPage {
//   static get parameters() {
//     return [[NavController]];
//   }
//
//   constructor(nav) {
//     this.nav = nav;
//   }
// }
