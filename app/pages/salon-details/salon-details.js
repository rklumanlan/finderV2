import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {SalonMapPage} from '../salon-map/salon-map';
import {TranslatePipe} from '../../pipes/translate';

@Component({
  templateUrl: 'build/pages/salon-details/salon-details.html',
  pipes: [TranslatePipe],
  providers: [GeolocationService],
})
export class SalonDetailsPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;
    this.SalonMapPage = SalonMapPage;

    this.item_select_salon = this.navParams.get('item_select_salon');
    console.log(this.item_select_salon);

    this.photos = [];
    this.results = [];
    this.reviews = [];

  }

  ionViewWillEnter(){
    var me = this;
    console.log('detail');
    console.log(document.getElementById('salon_map_dtl'));
    me.geolocationService.setPlaceDetails('salon_map_dtl',me.item_select_salon.place_id).then(function (res) {
      console.log(res[0]);
      console.log('inner');
      me.results = res[0];

      if (res[0].reviews!==undefined) {
        me.reviews = res[0].reviews;
        me.setReviewRating();
      }

      if (res[0].photos!==undefined) {
        for (var i = 0; i < res[0].photos.length; i++) {
          me.photos.push(res[0].photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300}));
        }
        console.log(me.photos);
      }
      else {
        me.photos.push(res[0].icon);
      }

    });
  }

  ionViewLoaded(){
    var me = this;
    // setTimeout(function() {
      var x = document.getElementById("salons_rating");
      var y = document.getElementById("operating_hours");
      var rating,half,remaining;

      // for (var a = 0; a < me.item_select.rating.length; a++) {
        //rating number
        rating = Math.floor(me.item_select_salon.rating);
        //get decimal num if there is
        half = (me.item_select_salon.rating % 1).toFixed(1);
        //reamianing stars to append
        remaining = Math.floor(5 - me.item_select_salon.rating);

        if (me.item_select_salon.rating!=0) {
          var ctr = 0;
          for (var b = 1; b <= rating; b++) {
            x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
            ctr=ctr+1;
          }
          //int
          if (me.item_select_salon.rating % 1 === 0) {
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
              }
              ctr=ctr+1;
            }
          }
          //float
          else if (me.item_select_salon.rating % 1 !== 0) {
            if (half !== 0.0 && (me.item_select_salon.rating %1 !== 0)) {
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
        console.log(me.item_select_salon.opening_hours);
        if (me.item_select_salon.opening_hours!==undefined) {
          if (me.item_select_salon.opening_hours.open_now!==undefined) {
            if (me.item_select_salon.opening_hours.open_now === true) {
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

}
