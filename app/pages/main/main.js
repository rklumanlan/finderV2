import {Page, Storage, SqlStorage} from 'ionic-angular';
import {TabsPage} from '../jeepney/tabs/tabs';
// Import menu pages
import {RestaurantPage} from '../restaurant/restaurant';
import {HotelsPage} from '../hotels/hotels';
import {MallsPage} from '../malls/malls';
import {SupermarketsPage} from '../supermarkets/supermarkets';
import {SalonsPage} from '../salons/salons';
import {PolicePage} from '../police/police';
import {HospitalsPage} from '../hospitals/hospitals';
// Import menu pages until here
import {DataService} from '../../services/data';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/main/main.html',

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
    // menu pages
    this.RestaurantPage = RestaurantPage;
    this.HotelsPage = HotelsPage;
    this.MallsPage = MallsPage;
    this.SupermarketsPage = SupermarketsPage;
    this.SalonsPage = SalonsPage;
    this.PolicePage = PolicePage;
    this.HopitalsPage = HospitalsPage;
    // menu pages until here
    this.coordsVal = null;
    // this.loadscript();


  }


  showlatlong(event) {
    console.log("geolocation working");

    Geolocation.getCurrentPosition().then((resp) => {
     //resp.coords.latitude
     //resp.coords.longitude
    })

    let watch = Geolocation.watchPosition();
    watch.subscribe((data) => {
     //data.coords.latitude
     //data.coords.longitude
    })

    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.value =  position.coords.latitude  + ',' + position.coords.longitude;

        this.coordsVal = position.coords.latitude  + ',' + position.coords.longitude;

        console.log(this.coordsVal);
       //var element = document.getElementById("geolocation").value= (position.coords.latitude  + ',' + position.coords.longitude);
}


    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });

  }


}
