import {Component} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {DataService} from '../../../services/data';
import {JeepDetailsPage} from '../../jeepney/jeep-routes/jeep.details';
import {TranslatePipe} from '../../../pipes/translate';

@Component({
  templateUrl: 'build/pages/jeepney/jeep-routes/jeep.view.html',
  pipes: [TranslatePipe]
})

export class JeepRoutesPage {
  static get parameters(){
    return [[DataService]];
  }
  constructor(dataService){
    //database service
    this.dataService = dataService;


    this.JeepDetailsPage = JeepDetailsPage;

    this.acjeeps = [];
    this.cjeeps = [];

    // this.dataService.insertJeepsData();

    this.dataService.getAllData('Angeles').then((data) => {
      // console.log(data.result);
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {
          this.acjeeps.push({name: data.res.rows.item(i).name, color: data.res.rows.item(i).color, image:data.res.rows.item(i).image});
        }
      }
      console.log(this.acjeeps);
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

    this.dataService.getAllData('Clark').then((data) => {
      console.log(data.result);
      if(data.res.rows.length > 0) {
        for(var i = 0; i < data.res.rows.length; i++) {
          this.cjeeps.push({name: data.res.rows.item(i).name, color: data.res.rows.item(i).color, image:data.res.rows.item(i).image});
        }
      }
      console.log(this.cjeeps);
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

  }

}
