import {Page, Modal, NavController, Alert} from 'ionic-angular';

import {MyModal} from '../../jeepney/find-routes/modal';

import {RoutesMapsPage} from '../../jeepney/find-routes/routes.map';

@Page({
  templateUrl: 'build/pages/jeepney/find-routes/routes.view.html'
})
export class FindRoutesPage {
  static get parameters(){
    return [[NavController]];
  }

  constructor(nav){
    this.nav = nav;
    this.from = 'Choose starting point';
    this.to = 'Choose destination';

    console.log(this.from);

    // this.modal = modal;
  }
  showModal(ctr){
    // this.modal = Modal.create(MyModal);
    // this.nav.present(this.modal)
    // alert('ads');
    console.log(ctr);
    let profileModal = Modal.create(MyModal, { ctrId: ctr });
    profileModal.onDismiss(data => {
      console.log(data);
      console.log(data!=undefined);
      if (data!=undefined) {
        if (ctr=='from') {
          this.from = data.point;
        }
        else if (ctr=='to') {
          this.to = data.point;
        }
      }


      // console.log(data.point);
    });
    this.nav.present(profileModal);
  }
  submitForm(from,to){

    if(from == 'Choose starting point' || to == 'Choose destination'){
      console.log(from+"-"+to);
      let alert = Alert.create({
        title: 'Alert',
        subTitle: 'Empty Fields! Please select starting point or destination.',
        buttons: ['OK']
      });
      this.nav.present(alert);
    }
    else {
      this.nav.push(RoutesMapsPage, { from: from, to: to });
    }

  }


}
