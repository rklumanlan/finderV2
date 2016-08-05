import {Component} from '@angular/core';
import {NavParams, Storage, SqlStorage,IonicApp} from 'ionic-angular';
import {DataService} from '../../services/data';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {GoogleMapsService} from '../../providers/google-maps-service/google-maps-service';
import {LoadingModal} from '../../components/loading-modal/loading-modal';


@Component({
  templateUrl: 'build/pages/maps/maps.html',

})

export class MapsPage {
  static get parameters(){
    return [[DataService],[NavParams],[ConnectivityService],[IonicApp],[GoogleMapsService]];
  }
  constructor(dataService,navParams,connectivityService,app,googleMapsService){

    this.googleMapsService = googleMapsService;

    this.googleMapsService.loadGoogleMaps();
}
