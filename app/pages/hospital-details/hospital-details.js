import {Page, NavParams, Storage, SqlStorage, IonicApp, NavController} from 'ionic-angular';
import {DataService} from '../../services/data';
import {HospitalsPage} from '../hospitals/hospitals';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
/*
  Generated class for the HospitalDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/hospital-details/hospital-details.html',
  providers: [GeolocationService]
})
export class HospitalDetailsPage {
  static get parameters() {
    return [[DataService],[NavParams],[NavController],[GeolocationService]];
  }

  constructor(dataService,navParams,nav,geolocationService) {
    this.dataService = dataService;
    this.navParams = navParams;
    this.nav = nav;
    this.geolocationService = geolocationService;
    this.HospitalsPage = HospitalsPage;

    this.hospdetail = this.navParams.get('hospdetail');
  }

  onPageLoaded(){
    this.geolocationService.getHospital(this.hospdetail);
  }
}
