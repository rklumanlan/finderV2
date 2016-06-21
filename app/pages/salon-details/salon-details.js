import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
/*
  Generated class for the SalonDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/salon-details/salon-details.html',
})
export class SalonDetailsPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav,navParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.SalonDetailsPage = SalonDetailsPage;
    this.item_select_salon = this.navParams.get('item_select_salon');
    console.log(this.item_select_salon);
  }
}
