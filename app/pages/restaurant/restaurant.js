import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
// import {DataService} from '../../../services/data';
import {LoadingModal} from '../../components/loading-modal/loading-modal';

/*
  Generated class for the RestaurantPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/restaurant/restaurant.html',
  directives: [LoadingModal],
   providers: [GeolocationService]
})
export class RestaurantPage {
  static get parameters() {
    return [[NavController],[NavParams],[GeolocationService]];
  }

  constructor(nav,navParams,geolocationService) {
    this.RestaurantPage = RestaurantPage;
    this.nav = nav;
    this.navParams = navParams;
    this.geolocationService = geolocationService;

    this.details = navParams.get('geoloc');
    console.log(this.details);

    // this.cuisine = 'any';
    // this.placeType = 'restaurant';
    // this.sort = 'PROMINENCE';

    this.params = {};

    this.placeType = 'restaurant';
    this.sort = 'Distance';
    this.cuisine = 'food';

    this.items = null;

  }

  onPageLoaded(){
    console.log('loaded1');
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = 'restaurant';
    me.params.cuisine = 'food';
    me.params.sort = 'DISTANCE';
    me.geolocationService.setPlaces(me.params).then(function (res) {
      console.log(res);

      setTimeout(function() {
        console.log('res');
        console.log(res);

        me.items = res;
      }, 8000);

    });


  }

  updatePlaceType(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = me.placeType;
    if (me.placeType == 'cafe') {
      me.params.cuisine = '';
      document.getElementById('cuisine').getElementsByTagName('button')[0].disabled=true;
    }
    else {
      me.params.cuisine = me.cuisine;
      document.getElementById('cuisine').getElementsByTagName('button')[0].disabled=false;
    }
    me.geolocationService.setPlaces(me.params).then(function (res) {
      console.log(res);
      me.items = res;
    });
  }

  updateCuisine(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = me.placeType;
    me.params.cuisine = me.cuisine;
    me.geolocationService.setPlaces(me.params).then(function (res) {
      console.log(res);
      me.items = res;
    });

  }

  updateSort(){
    var me = this;

    if (me.sort == 'Alphabetically') {
      me.items.sort(function(a,b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      console.log('enter alpha');

    }
    else if (me.sort== 'Rating') {
      me.items.sort(function(a,b) {
        a = a.rating;
        b = b.rating;
        return a < b ? 1 : (a > b ? -1 : 0);
      });
      console.log('enter rating');
    }
    else {
      console.log('enter distance');
      me.items.sort(function(a,b) {
        a = a.distance;
        b = b.distance;
        return a < b ? -1 : (a > b ? 1 : 0);
      });
    }
    console.log(me.items);
  }


}
