import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';


/*
  Generated class for the MallDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/mall-details/mall-details.html',
})
export class MallDetailsPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav,navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.item_select_mall = this.navParams.get('item_select_mall');
    console.log(this.item_select_mall);
  }
}
