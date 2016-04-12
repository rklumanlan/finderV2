import {Page,NavParams, Storage, SqlStorage} from 'ionic-angular';

import {JeepMapsPage} from '../../jeepney/jeep-routes/jeep.map';

import {DataService} from '../../../services/data';

@Page({
  templateUrl: 'build/pages/jeepney/jeep-routes/jeep.details.html'
})

export class JeepDetailsPage {
  static get parameters(){
    return [[DataService],[NavParams]];
  }
  constructor(dataService,navParams){
    this.JeepMapsPage = JeepMapsPage;
    this.dataService = dataService;
    this.navParams = navParams;

    this.details = navParams.get('jeep');

    this.jeepDetails = [];
    console.log(this.details.name);

    this.dataService.getJeepDetails(this.details.name).then((data) => {
      this.jeepDetails = data.res.rows[0];
      console.log(this.jeepDetails);
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });
  }
}
