import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the SalonsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/salons/salons.html',
})
export class SalonsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.SalonsPage = SalonsPage;
  }
}
