import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {TranslatePipe} from '../../pipes/translate';
// import {RestaurantDetailsPage} from '../restaurant-details/restaurant-details';

@Component({
  templateUrl: 'build/pages/uni-map-page/uni-map-page.html',
  pipes: [TranslatePipe],
  providers: [GeolocationService]
})
export class UniMapPage {
  static get parameters() {
    return [[NavParams],[NavController],[GeolocationService]];
  }

  constructor(navParams,nav,geolocationService) {
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;
    this.page = navParams.get('page');
    this.item_coordinates = this.navParams.get('item_coordinates');
    console.log(this.item_coordinates.geometry.location);

    if(this.page =='resto'){
      this.title_header = "Restaurant Map";
    }
    else if(this.page =='hotels'){
      this.title_header = "Hotel Map";
    }
    else if(this.page =='malls'){
      this.title_header = "Mall Map";
    }
    else if(this.page =='supermarkets'){
      this.title_header = "Supermarket Map";
    }
    else if(this.page =='salons'){
      this.title_header = "Beauty Salon Map";
    }
    else if(this.page =='police'){
      this.title_header = "Police Staion Map";
    }
    else if(this.page =='hospitals'){
      this.title_header = "Hospital Map";
    }
  }

  ionViewDidEnter(){
    var me = this;
    me.geolocationService.getPolHosp(me.item_coordinates,me.page);
  }
}
