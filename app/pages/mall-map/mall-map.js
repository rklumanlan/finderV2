import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
/*
  Generated class for the MallMapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/mall-map/mall-map.html',
  providers: [GeolocationService]
})
export class MallMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;

    this.MallMapPage = MallMapPage;

    this.item_coordinates_mall = this.navParams.get('item_coordinates_mall');
    console.log(this.item_coordinates_mall.name);
  }
  onPageDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates_mall,'mall');
  }
}
