import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';

/*
  Generated class for the SupermarketDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/supermarket-details/supermarket-details.html',
})
export class SupermarketDetailsPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav,navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.item_select_supmarket = this.navParams.get('item_select_supmarket');
    console.log(this.item_select_supmarket);
  }
}
