import {Component,ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
import {MallDetailsPage} from '../mall-details/mall-details';
import {TranslatePipe} from '../../pipes/translate';

/*
  Generated class for the MallsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/malls/malls.html',
  directives: [LoadingModal],
   providers: [GeolocationService],
   queries: {
     content: new ViewChild(Content)
   },
   pipes: [TranslatePipe]
})
export class MallsPage {
  static get parameters() {
    return [[NavController],[NavParams],[GeolocationService]];
  }

  constructor(nav,navParams,geolocationService) {
    this.MallsPage = MallsPage;
    this.MallDetailsPage = MallDetailsPage;
    this.nav = nav;
    this.navParams = navParams;
    this.geolocationService = geolocationService;

    this.details = navParams.get('geoloc');

    this.params = {};

    this.placeType = 'shopping_mall';
    this.sort = 'Distance';
    this.cuisine = 'food';

    this.items = [];
    this.res = null;
    this.count = null;

    this.disable = null;

    console.log(this.details);
    console.log("Malls list working");
  }

  ionViewWillEnter(){
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = 'shopping_mall';
    me.params.cuisine = '';

    me.disable = true;

    me.geolocationService.setPlaces(me.params).then(function (res) {
      setTimeout(function() {
        console.log(res);
        me.res = res;
        me.items = [];
        for (me.count = 0; me.count < 20; me.count++) {
          if (res[me.count]!==undefined) {
            me.items.push(res[me.count]);
          }

        }
          console.log(me.items);
        me.setMallRating();
        document.getElementById('loading').style.display="none";
      }, 2000);
    });

  }

  doInfinite(infiniteScroll) {
    //visibility:hidden
    var me = this;
    console.log('Begin async operation');
    console.log(me.res);
    console.log( me.count);
    console.log('Infinite scroll working');
    setTimeout(() => {
      var i;
      for (i = me.count; i < me.res.length; i++) {
        me.items.push(me.res[i]);
        console.log(i);
      }
      me.setMallRating();

      me.count = i;

      console.log('Async operation has ended');
      infiniteScroll.complete();
      if (i==me.res.length) {
        infiniteScroll.enable(false);
      }
    }, 2000);

  }

  updateSort(){
    var me = this;
    me.sortItems(me.sort);
  }

  updatePlaceType(){
    document.getElementById('loading').style.display="inline";
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = me.placeType;

    me.geolocationService.setPlaces(me.params).then(function (res) {
      me.items = [];
      setTimeout(function() {
        me.items = res;
        me.setMallRating();
        me.sortItems(me.sort);
        document.getElementById('loading').style.display="none";
      }, 2000);
    });
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
    me.content.scrollToTop();
  }

  setMallRating(){
    var me = this;
    console.log('setMallRating');
    setTimeout(function() {

      var x = document.getElementsByClassName("mall_rating");
      var y = document.getElementsByClassName("mall_hours");
      var rating,half,remaining;

      for (var a = 0; a < me.items.length; a++) {

        if (x[a]!==undefined||y[a]!==undefined) {
          console.log(x[a]);
          console.log(y[a]);
          //rating number
          rating = Math.floor(me.items[a].rating);
          //get decimal num if there is
          half = (me.items[a].rating % 1).toFixed(1);
          //reamianing stars to append
          remaining = Math.floor(5 - me.items[a].rating);
          //appending store open
          if (me.items[a].opening_hours!==undefined) {
            if (me.items[a].opening_hours.open_now!==undefined) {
              console.log(me.items[a].opening_hours.open_now);
              console.log(y[a]);
              if (y[a].innerHTML=="") {
                if (me.items[a].opening_hours.open_now === true) {
                  y[a].insertAdjacentHTML( 'beforeend', '<ion-label secondary>Open <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
                }
                else {
                  y[a].insertAdjacentHTML( 'beforeend', '<ion-label danger>Close <ion-icon name="clock" role="img" class="ion-ios-clock-outline" aria-label="ios-clock-outline"></ion-icon></ion-label>');
                }
              }


            }
          }

          if (me.items[a].rating!=0) {
            var ctr = 0;
            if (x[a].innerHTML=="") {
              for (var b = 1; b <= rating; b++) {
                x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
                ctr=ctr+1;
              }
              //int
              if (me.items[a].rating % 1 === 0) {
                if (remaining !== 0 && ctr<=5) {
                  for (var b = 1; b <= (5-ctr); b++) {
                    x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                  }
                  ctr=ctr+1;
                }
              }
              //float
              else if (me.items[a].rating % 1 !== 0) {
                if (half !== 0.0 && (me.items[a].rating %1 !== 0)) {
                  x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-half" role="img" class="ion-ios-star-half" aria-label="ios-star-half"></ion-icon>');
                  ctr=ctr+1;
                }
                if (remaining !== 0 && ctr<=5) {
                  for (var b = 1; b <= (5-ctr); b++) {
                    x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
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
