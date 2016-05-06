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
    var me = this;

    if(from == 'Choose starting point' || to == 'Choose destination'){
      console.log(from+"-"+to);
      let alert = Alert.create({
        title: 'Alert',
        subTitle: 'Empty Fields! Please select starting point or destination.',
        buttons: ['OK']
      });
      this.nav.present(alert);
    }
    else if (from == to) {
      let alert = Alert.create({
        title: 'Alert',
        subTitle: 'Starting point and destination must not be the',
        buttons: ['OK']
      });
      this.nav.present(alert);
    }
    else if (from == to) {
      me.alertBox('Alert','Starting point and destination must not be the same.');
    }
    else if (from =="Angeles City Hall" && to == "Marquee Mall") {
      me.alertBox(to);
    }
    else if (from == "Marquee Mall"&&to =="Angeles City Hall") {
      me.alertBox(to);
    }
    else if (from =="Main Gate Terminal" && to == "SM City Clark") {
      me.alertBox(to);
    }
    else if (from == "SM City Clark"&&to =="Main Gate Terminal") {
      me.alertBox(to);
    }
    else if (from == 'Angeles University Foundation' && to== 'Angeles University Foundation Medical Center') {
      me.alertBox(to);
    }
    else if (from == 'Angeles University Foundation Medical Center' && to== 'Angeles University Foundation') {
      me.alertBox(to);
    }
    else if (from == 'Holy Angel University' && to== 'Holy Rosary Parish Church') {
      me.alertBox(to);
    }
    else if (from == 'Holy Rosary Parish Church' && to== 'Holy Angel University') {
      me.alertBox(to);
    }
    else if (from == 'Immaculate Concepcion Parish' && to== 'Systems Plus College Foundation') {
      me.alertBox(to);
    }
    else if (from== 'Systems Plus College Foundation' && to == 'Immaculate Concepcion Parish') {
      me.alertBox(to);
    }
    else if (from == 'Friendship Plaza' && to== 'Timog Park Gate 3') {
      me.alertBox(to);
    }
    else if (from== 'Timog Park Gate 3'&&to == 'Friendship Plaza') {
      me.alertBox(to);
    }
    else if (from == 'Jenra Mall' && to== 'Nepo Mall') {
      me.alertBox(to);
    }
    else if (from== 'Nepo Mall'&&to == 'Jenra Mall') {
      me.alertBox(to);
    }
    else if (from == "Diamond Subdivision"&&to =="Savers Mall") {
      me.alertBox(to);
    }
    else if (from == "Savers Mall"&&to =="Diamond Subdivision") {
      me.alertBox(to);
    }
    else if (from == "Timog Park Gate 1"&&to =="Carmenville") {
      me.alertBox(to);
    }
    else if (from =="Carmenville" && to == "Timog Park Gate 1") {
      me.alertBox(to);
    }
    else {
      console.log(from+"="+to);
      this.nav.push(RoutesMapsPage, { from: from, to: to });
    }

  }
  alertBox(to){
    let alert = Alert.create({
      title: 'Alert',
      subTitle: 'You are just near to '+to+'. You don\'t need to ride a jeepney.',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }


}
