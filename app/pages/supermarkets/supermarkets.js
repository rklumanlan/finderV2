import {Page, NavController} from 'ionic-angular';


import {TranslatePipe} from '../../pipes/translate';

/*
  Generated class for the SupermarketsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/supermarkets/supermarkets.html',
  pipes: [TranslatePipe]
})
export class SupermarketsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.SupermarketsPage = SupermarketsPage;
  }
}
