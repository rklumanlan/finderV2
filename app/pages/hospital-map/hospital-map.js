import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the HospitalMapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/hospital-map/hospital-map.html',
})
export class HospitalMapPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}