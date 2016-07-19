import {Component} from '@angular/core';
import {Storage, SqlStorage, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../services/data';
import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {HospitalDetailsPage} from '../hospital-details/hospital-details';
import {TranslatePipe} from '../../pipes/translate';

/*
  Generated class for the HospitalsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/hospitals/hospitals.html',
  providers: [GeolocationService],
  pipes: [TranslatePipe]
})
export class HospitalsPage {
  static get parameters(){
    return [[DataService],[NavController],[NavParams],[GeolocationService]];
  }
  constructor(dataService,nav,navParams,geolocationService) {
    this.dataService = dataService;
    this.nav = nav;
    this.navParams = navParams;
    this.geolocationService = geolocationService;

    this.HospitalsPage = HospitalsPage;
    this.HospitalDetailsPage = HospitalDetailsPage;

    this.hospitaldetails = [];

    // this.dataService.insertJeepsData();

    this.dataService.getHospitalDetails().then((data) => {
      // console.log(data.result);
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {
          this.hospitaldetails.push({name: data.res.rows.item(i).name, address: data.res.rows.item(i).address, email:data.res.rows.item(i).email, landline:data.res.rows.item(i).landline, lat:data.res.rows.item(i).lat, lng:data.res.rows.item(i).lng});
        }
      }
      console.log(this.hospitaldetails);
      console.log("hospitals getting details");
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });
}
}
