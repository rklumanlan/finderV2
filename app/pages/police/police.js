import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the PolicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/police/police.html',
})
export class PolicePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.PolicePage = PolicePage;
  }
}
