import {Page, NavController} from 'ionic-angular';


import {TranslatePipe} from '../../pipes/translate';

/*
  Generated class for the SalonsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/salons/salons.html',
  pipes: [TranslatePipe]
})
export class SalonsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.SalonsPage = SalonsPage;
  }
}
