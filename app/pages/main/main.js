import {Page, Storage, SqlStorage} from 'ionic-angular';
import {TabsPage} from '../jeepney/tabs/tabs';
import {DataService} from '../../services/data';


@Page({
  templateUrl: 'build/pages/main/main.html'
})

export class MainPage {
  static get parameters(){
    return [[DataService]];
  }
  constructor(dataService) {
    //database service
    this.dataService = dataService;

        // this.dataService.insertJeepsData();
        //     this.dataService.insertPointsData();


    this.TabsPage = TabsPage;
  }
}
