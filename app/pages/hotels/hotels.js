import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the HotelsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/hotels/hotels.html',
})
export class HotelsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.HotelsPage = HotelsPage;
  }
}
