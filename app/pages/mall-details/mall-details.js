import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {MallMapPage} from '../mall-map/mall-map';
import {TranslatePipe} from '../../pipes/translate';

@Component({
  templateUrl: 'build/pages/mall-details/mall-details.html',
  providers: [GeolocationService],
  pipes: [TranslatePipe]
})
export class MallDetailsPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;

    this.MallDetailsPage = MallDetailsPage;
    this.MallMapPage = MallMapPage;

    // this.getPlacePhoto();

    this.item_select_mall = this.navParams.get('item_select_mall');
    console.log(this.item_select_mall);
  }

  ionViewLoaded(){
    var me = this;
    // setTimeout(function() {
      var x = document.getElementById("mall_rating");
      var y = document.getElementById("mall_hours");
      var rating,half,remaining;
      // for (var a = 0; a < me.item_select.rating.length; a++) {
        //rating number
        rating = Math.floor(me.item_select_mall.rating);
        //get decimal num if there is
        half = (me.item_select_mall.rating % 1).toFixed(1);
        //reamianing stars to append
        remaining = Math.floor(5 - me.item_select_mall.rating);

        if (me.item_select_mall.rating!=0) {
          var ctr = 0;
          for (var b = 1; b <= rating; b++) {
            x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
            ctr=ctr+1;
          }
          //int
          if (me.item_select_mall.rating % 1 === 0) {
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
              }
              ctr=ctr+1;
            }
          }
          //float
          else if (me.item_select_mall.rating % 1 !== 0) {
            if (half !== 0.0 && (me.item_select_mall.rating %1 !== 0)) {
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
        console.log(me.item_select_mall.opening_hours);
        if (me.item_select_mall.opening_hours!==undefined) {
          if (me.item_select_mall.opening_hours.open_now!==undefined) {
            if (me.item_select_mall.opening_hours.open_now === true) {
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

  getPlacePhoto(){
    var me = this;
    var t = document.getElementById("itm_photo");
    console.log(document.getElementById("itm_photo"));

    if(me.item_select_mall.photos ==!undefined){
      t.insertAdjacentHTML( 'beforeend', '<ion-label secondary>Open <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
    }
    else{
      return;
    }
  }

}
