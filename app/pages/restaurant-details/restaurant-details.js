import {Page, NavController, NavParams} from 'ionic-angular';
// import {RestaurantPage} from '../restaurant/restaurant';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {RestaurantMapPage} from '../restaurant-map/restaurant-map';

/*
  Generated class for the RestaurantDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/restaurant-details/restaurant-details.html',
})
export class RestaurantDetailsPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav,navParams) {
    this.RestaurantMapPage = RestaurantMapPage;
    this.nav = nav;
    this.navParams = navParams;
    this.item_select = this.navParams.get('item_select');
    console.log(this.item_select);

    // this.getRating();
  }

  onPageLoaded(){
    var me = this;
    console.log(me.item_select.rating);
    console.log(me.item_select.opening_hours);
    console.log(me.item_select.geometry.location.lat);
    console.log("Resto Coordinates");
    // setTimeout(function() {
      var x = document.getElementById("resto_rating");
      var y = document.getElementById("operating_hours");
      var rating,half,remaining;

      // for (var a = 0; a < me.item_select.rating.length; a++) {
        //rating number
        rating = Math.floor(me.item_select.rating);
        //get decimal num if there is
        half = (me.item_select.rating % 1).toFixed(1);
        //reamianing stars to append
        remaining = Math.floor(5 - me.item_select.rating);

        if (me.item_select.rating!=0) {
          var ctr = 0;
          for (var b = 1; b <= rating; b++) {
            x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
            ctr=ctr+1;
          }
          //int
          if (me.item_select.rating % 1 === 0) {
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
              }
              ctr=ctr+1;
            }
          }
          //float
          else if (me.item_select.rating % 1 !== 0) {
            if (half !== 0.0 && (me.item_select.rating %1 !== 0)) {
              x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-half" role="img" class="ion-ios-star-half" aria-label="ios-star-half"></ion-icon>');
              ctr=ctr+1;
            }
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                ctr=ctr+1;
              }

            }
          }
          console.log(ctr+" ctr");
        }
        //appending store open
        if (me.item_select.opening_hours!==undefined) {
          if (me.item_select.opening_hours.open_now!==undefined) {
            if (me.item_select.opening_hours.open_now === true) {
              y.insertAdjacentHTML( 'beforeend', '<ion-label secondary>Open <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
            }
            else {
              y.insertAdjacentHTML( 'beforeend', '<ion-label danger>Close <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
              ctr=ctr+1;
            }

          }

        }
      }

    // }, 400);

  // }
}
