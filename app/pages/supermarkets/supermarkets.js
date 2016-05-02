import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the SupermarketsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/supermarkets/supermarkets.html',
})
export class SupermarketsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.SupermarketsPage = SupermarketsPage;
  }
}
