import {Page} from 'ionic-angular';
// import {MainPage} from '../main/main';
import {JeepRoutesPage} from '../../jeepney/jeep-routes/jeep.view';
import {FindRoutesPage} from '../../jeepney/find-routes/routes.view';


import {TranslatePipe} from '../../../pipes/translate';

@Page({
  templateUrl: 'build/pages/jeepney/tabs/tabs.html',
  pipes: [TranslatePipe]
})

export class TabsPage {
  constructor() {
    this.tab1 = JeepRoutesPage;
    this.tab2 = FindRoutesPage;
  }
}
