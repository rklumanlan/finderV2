import {Page, Modal, NavController} from 'ionic-angular';

import {MyModal} from '../../jeepney/find-routes/modal';

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


}
