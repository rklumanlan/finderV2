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
    this.MallMapPage = MallMapPage;

    this.item_select_mall = this.navParams.get('item_select_mall');
    console.log(this.item_select_mall);

    this.photos = [];
    this.results = [];
    this.reviews = [];

  }

  // ionViewWillEnter(){
  //   var me = this;
  //   console.log('detail');
  //   console.log(document.getElementById('mall_map_dtl'));
  //   me.geolocationService.setPlaceDetails('mall_map_dtl',me.item_select_mall.place_id).then(function (res) {
  //     console.log(res[0]);
  //     console.log('inner');
  //     me.results = res[0];
  //
  //     if (me.item_select_mall.reviews!==undefined) {
  //       me.reviews = me.item_select_mall.reviews;
  //       me.setReviewRating();
  //     }
  //
  //     if (me.item_select_mall.photos!==undefined) {
  //       for (var i = 0; i < me.item_select_mall.photos.length; i++) {
  //         me.photos.push(me.item_select_mall.photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300}));
  //       }
  //       console.log(me.photos);
  //     }
  //     else {
  //       me.photos.push(me.item_select_mall.icon);
  //     }
  //
  //     me.contact = me.item_select_mall.international_phone_number;
  //     me.insertPlaceContact();
  //
  //   });
  // }

  ionViewLoaded(){
    console.log('loaded');
    var me = this;


    var x = document.getElementById("mall_rating");
    var y = document.getElementById("mall_hours");
    var rating,half,remaining;

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

    if (me.item_select_mall.reviews!==undefined) {
      console.log('lllllllll');
      me.reviews = me.item_select_mall.reviews;
      me.setReviewRating();
    }

    if (me.item_select_mall.photos!==undefined) {
      for (var i = 0; i < me.item_select_mall.photos.length; i++) {
        me.photos.push(me.item_select_mall.photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300}));
      }
      console.log(me.photos);
    }
    else {
      me.photos.push(me.item_select_mall.icon);
    }

    me.contact = me.item_select_mall.international_phone_number;
    me.insertPlaceContact();
  }


  setReviewRating(){
    var me = this;

    setTimeout(function() {
    var w = document.getElementsByClassName("review_rating");
    var rating,half,remaining;

    console.log("Set Review Rating");
    console.log(me.reviews);
    console.log(document.getElementsByClassName("review_rating"));

    for (var a = 0; a < me.reviews.length; a++) {
      if (w[a]!==undefined) {
        //rating number
        rating = Math.floor(me.reviews[a].rating);
        //get decimal num if there is
        half = (me.reviews[a].rating % 1).toFixed(1);
        //reamianing stars to append
        remaining = Math.floor(5 - me.reviews[a].itm_rating);

        if (me.reviews[a].rating!=0) {
          var ctr = 0;
          if (w[a].innerHTML=="") {
            for (var b = 1; b <= rating; b++) {
              w[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
              ctr=ctr+1;
            }
            //int
            if (me.reviews[a].rating % 1 === 0) {
              if (remaining !== 0 && ctr<=5) {
                for (var b = 1; b <= (5-ctr); b++) {
                  w[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                }
                ctr=ctr+1;
              }
            }
            //float
            else if (me.reviews[a].rating % 1 !== 0) {
              if (half !== 0.0 && (me.reviews[a].rating %1 !== 0)) {
                w[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-half" role="img" class="ion-ios-star-half" aria-label="ios-star-half"></ion-icon>');
                ctr=ctr+1;
              }
              if (remaining !== 0 && ctr<=5) {
                for (var b = 1; b <= (5-ctr); b++) {
                  w[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                  ctr=ctr+1;
                }
              }
            }
            console.log(ctr+" ctr");
          }
        }
      }
    }
  }, 500);
}

insertPlaceContact(){
  var me = this;
  var v = document.getElementById('place_contact');
  console.log(me.contact);

    if (me.contact !== undefined){
      v.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="ios-call" role="img" class="ion-ios-call" aria-label="ios-call"></ion-icon><span class="contact_no">&nbsp;&nbsp;'+ me.contact + '</span>');
    }

    else{
      v.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="ios-call" role="img" class="ion-ios-call" aria-label="ios-call" style="color:#B7B7B7;"></ion-icon><span style="color:#B7B7B7;">&nbsp;&nbsp;(No contact number provided.)</span>');
    }
  }

}
