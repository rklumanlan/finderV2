import {Page, Storage, SqlStorage, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../services/data';
import {Geolocation} from 'ionic-native';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {PoliceDetailsPage} from '../police-details/police-details';

import {TranslatePipe} from '../../pipes/translate';
/*
  Generated class for the PolicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/police/police.html',
  providers: [GeolocationService],
  pipes: [TranslatePipe]
})
export class PolicePage {
  static get parameters(){
    return [[DataService],[NavController],[NavParams],[GeolocationService]];
  }
  constructor(dataService,nav,navParams,geolocationService){
    //database service
    this.dataService = dataService;
    this.nav = nav;
    this.navParams = navParams;
    this.geolocationService = geolocationService;


    this.PolicePage = PolicePage;
    this.PoliceDetailsPage = PoliceDetailsPage;

    this.policestations = [];

    // this.dataService.insertJeepsData();

    this.dataService.getPoliceDetails().then((data) => {
      // console.log(data.result);
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {
          this.policestations.push({name: data.res.rows.item(i).name, address: data.res.rows.item(i).address, email:data.res.rows.item(i).email, landline:data.res.rows.item(i).landline, mobile:data.res.rows.item(i).mobile, lat:data.res.rows.item(i).lat, lng:data.res.rows.item(i).lng});
        }
      }
      console.log(this.policestations);
      console.log("police stations getting details");
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

  }
}
