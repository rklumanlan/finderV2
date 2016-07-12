import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {HotelMapPage} from '../hotel-map/hotel-map';
/*
  Generated class for the HotelDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/hotel-details/hotel-details.html',
  providers: [GeolocationService]
})
export class HotelDetailsPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.nav = nav;
    this.navParams = navParams;
    this.HotelDetailsPage = HotelDetailsPage;
    this.HotelMapPage = HotelMapPage;
    
    this.item_select_hotel = this.navParams.get('item_select_hotel');
    console.log(this.item_select_hotel);
  }

  onPageLoaded(){
    var me = this;
    console.log(me.item_select_hotel.rating);
    console.log(me.item_select_hotel.opening_hours);
    console.log(me.item_select_hotel.geometry.location.lat);
    console.log("Hotel Coordinates");
    // setTimeout(function() {
      var x = document.getElementById("hotel_rating");
      // var y = document.getElementById("operating_hours");
      var rating,half,remaining;

      // for (var a = 0; a < me.item_select_hotel.rating.length; a++) {
        //rating number
        rating = Math.floor(me.item_select_hotel.rating);
        //get decimal num if there is
        half = (me.item_select_hotel.rating % 1).toFixed(1);
        //reamianing stars to append
        remaining = Math.floor(5 - me.item_select_hotel.rating);

        if (me.item_select_hotel.rating!=0) {
          var ctr = 0;
          for (var b = 1; b <= rating; b++) {
            x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
            ctr=ctr+1;
          }
          //int
          if (me.item_select_hotel.rating % 1 === 0) {
            if (remaining !== 0 && ctr<=5) {
              for (var b = 1; b <= (5-ctr); b++) {
                x.insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
              }
              ctr=ctr+1;
            }
          }
          //float
          else if (me.item_select_hotel.rating % 1 !== 0) {
            if (half !== 0.0 && (me.item_select_hotel.rating %1 !== 0)) {
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
      //   if (me.item_select.opening_hours!==undefined) {
      //     if (me.item_select.opening_hours.open_now!==undefined) {
      //       if (me.item_select.opening_hours.open_now === true) {
      //         y.insertAdjacentHTML( 'beforeend', '<ion-label secondary>Open <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
      //       }
      //       else {
      //         y.insertAdjacentHTML( 'beforeend', '<ion-label danger>Close <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
      //         ctr=ctr+1;
      //       }
      //
      //     }
      //
      //   }
      // }

    // }, 400);

  }

}
