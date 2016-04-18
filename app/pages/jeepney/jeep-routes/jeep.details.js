import {Page,NavParams, Storage, SqlStorage,Modal,NavController} from 'ionic-angular';

import {JeepMapsPage} from '../../jeepney/jeep-routes/jeep.map';

import {DataService} from '../../../services/data';

@Page({
  templateUrl: 'build/pages/jeepney/jeep-routes/jeep.details.html'
})

export class JeepDetailsPage {
  static get parameters(){
    return [[DataService],[NavParams],[NavController]];
  }
  constructor(dataService,navParams,nav){
    // this.JeepMapsPage = JeepMapsPage;
    this.nav = nav;
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
  presentModal() {
    (JeepMapsPage);
    this.nav.push(JeepMapsPage, { jeep: this.jeepDetails });
  }
}
