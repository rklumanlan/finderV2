import {Page, NavController} from 'ionic-angular';


import {TranslatePipe} from '../../pipes/translate';

/*
  Generated class for the MallsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/malls/malls.html',
  pipes:[TranslatePipe]
})
export class MallsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.MallsPage = MallsPage;
  }
}
