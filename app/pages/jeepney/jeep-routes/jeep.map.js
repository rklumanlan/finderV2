import {Page,NavParams, Storage, SqlStorage,IonicApp} from 'ionic-angular';

import {DataService} from '../../../services/data';

import {ConnectivityService} from '../../../providers/connectivity-service/connectivity-service';

import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';

import {LoadingModal} from '../../../components/loading-modal/loading-modal';


@Page({
  templateUrl: 'build/pages/maps/maps.html',
  directives: [LoadingModal],
})

export class JeepMapsPage {
  static get parameters(){
    return [[DataService],[NavParams],[ConnectivityService],[IonicApp],[GoogleMapsService]];
  }
  constructor(dataService,navParams,connectivityService,app,googleMapsService){

    // this.googleMapsService = googleMapsService;
    //
    // this.googleMapsService.loadGoogleMaps();

    // this.passJeepParams();

    // this.loading = app.getComponent('loading');
    // // this.loading.show();
    // // console.log(this.loading);
    //
    // // this.MapsPage = MapsPage;
    this.dataService = dataService;
    this.googleMapsService = googleMapsService;

    this.navParams = navParams;
    this.jeepney = this.navParams.get('jeep');
    this.jeep= this.jeepney;

    this.option = {};
    this.points = [];

    this.dataService.getPoints().then((data) => {
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {


          if (this.check_marks(data.res.rows.item(i).tags,this.jeep.name)) {
            this.points.push({text: data.res.rows.item(i).text, lat: data.res.rows.item(i).lat, lng:data.res.rows.item(i).lng, tags:data.res.rows.item(i).tags});
          }
        }
      }

    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

    this.option.jeep_1 = this.jeep;
    this.option.marker_1 = this.points;

    console.log(this.option);
    console.log(this.option.marker_1);

    this.googleMapsService.init(this.option);

  }

  check_marks(tags,name){
    var stringTags = tags;
    var index = stringTags.split(",");

    if (index.indexOf(name)!=-1) {
      return true;
    }
  }
}
