import {Page, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {LoadingModal} from '../../components/loading-modal/loading-modal';

import {TranslatePipe} from '../../pipes/translate';
import {HotelDetailsPage} from '../hotel-details/hotel-details';
/*
  Generated class for the HotelsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/hotels/hotels.html',
  directives: [LoadingModal],
   providers: [GeolocationService],
   pipes: [TranslatePipe],
  providers: [GeolocationService]
})
export class HotelsPage {
  static get parameters() {
    return [[NavController],[NavParams],[GeolocationService]];
  }

  constructor(nav,navParams,geolocationService) {
    this.nav = nav;
    this.navParams = navParams;
    this.geolocationService = geolocationService;
    this.HotelsPage = HotelsPage;
    this.HotelDetailsPage = HotelDetailsPage;
    // this.setHotelRating();

    this.details = navParams.get('geoloc');

    this.params = {};

    this.placeType = 'lodging';
    this.sort = 'Distance';
    // this.cuisine = 'food';

    this.items = null;

    console.log(this.details);
    console.log("Hotels list working");
  }
  onPageLoaded(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = 'lodging';
    // me.params.cuisine = 'food';
    me.geolocationService.setPlaces(me.params).then(function (res) {
      setTimeout(function() {
        me.items = res;
        // me.setRating();


      }, 8000);
    });
  }

  updateSort(){
    var me = this;
    me.sortItems(me.sort);
  }

  sortItems(sortVal){
    var me = this;
    if (sortVal == 'Alphabetically') {
      me.items.sort(function(a,b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
    }
    else if (sortVal== 'Rating') {
      me.items.sort(function(a,b) {
        a = a.rating;
        b = b.rating;
        return a < b ? 1 : (a > b ? -1 : 0);
      });
      console.log(me.items);
    }
    else {
      me.items.sort(function(a,b) {
        a = a.distance;
        b = b.distance;
        return a < b ? -1 : (a > b ? 1 : 0);
      });
      console.log(me.items);
    }
  }

//   setHotelRating(){
//     var me = this;
//     console.log("setHotelRating");
//     setTimeout(function() {
//
//       var x = document.getElementsByClassName('hotel_rating');
//       console.log(document.getElementsByClassName('hotel_rating'));
//       // var y = document.getElementsById("itm_hours");
//       var rating,half,remaining;
//
//       for (var a = 0; a < me.items.length; a++) {
//         //rating number
//         rating = Math.floor(me.items[a].rating);
//         //get decimal num if there is
//         half = (me.items[a].rating % 1).toFixed(1);
//         //reamianing stars to append
//         remaining = Math.floor(5 - me.items[a].rating);
//
//           if (me.items[a].rating!=0) {
//             var ctr = 0;
//             for (var b = 1; b <= rating; b++) {
//               x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
//               ctr=ctr+1;
//             }
//             //int
//             if (me.items[a].rating % 1 === 0) {
//               if (remaining !== 0 && ctr<=5) {
//                 for (var b = 1; b <= (5-ctr); b++) {
//                   x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
//                 }
//                 ctr=ctr+1;
//               }
//             }
//             //float
//             else if (me.items[a].rating % 1 !== 0) {
//               if (half !== 0.0 && (me.items[a].rating %1 !== 0)) {
//                 x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-half" role="img" class="ion-ios-star-half" aria-label="ios-star-half"></ion-icon>');
//                 ctr=ctr+1;
//               }
//               if (remaining !== 0 && ctr<=5) {
//                 for (var b = 1; b <= (5-ctr); b++) {
//                   x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
//                   ctr=ctr+1;
//                 }
//
//               }
//             }
//             console.log(ctr+" ctr");
//           }
//         // }
//
//       }
//
//     }, 400);
//
// }

}
