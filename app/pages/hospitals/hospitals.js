import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the HospitalsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/hospitals/hospitals.html',
})
export class HospitalsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.HospitalsPage = HospitalsPage;
  }
}
