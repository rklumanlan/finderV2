import {Page, NavParams} from 'ionic-angular';

import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';

import {DataService} from '../../../services/data';

import {LoadingModal} from '../../../components/loading-modal/loading-modal';

@Page({
  templateUrl: 'build/pages/jeepney/find-routes/routes.map.html',
  directives: [LoadingModal],
  providers: [GoogleMapsService]
})

export class RoutesMapsPage {
  static get parameters(){
    return [[NavParams],[GoogleMapsService],[DataService]];
  }

  constructor(navParams,googleMapsService,dataService){

    this.navParams = navParams;
    this.googleMapsService = googleMapsService;
    this.dataService = dataService;

    this.from = this.navParams.get('from');
    this.to = this.navParams.get('to');
    console.log(this.from+" "+this.to);

    this.initRoutes();
  }

  initRoutes(){

    var me = this;


    var jeep1,jeep2,jeep3,jeep4,jeep1End,jeep2End,jeep3End,jeep4End;

    if((this.from == 'Angeles City Hall'||this.from=='Citi Center'||this.from=='Marquee Mall') && (this.to == 'Angeles Medical Center Inc.' || this.to == 'Dr. Amando L. Garcia Medical Center, Inc.') ){
      jeep1 = 'PANDAN-PAMPANG';
      jeep2 = 'MARISOL-PAMPANG';
      jeep1End = '15.13784,120.58891';
      jeep2End = '15.137851,120.588826';
      console.log('getJeep');
      me.getJeep(jeep1,jeep2,null,null,jeep1End,jeep2End,null,null,'back','back');

    }
    else if((me.from == 'Angeles City Hall'||me.from=='Citi Center'||me.from=='Marquee Mall') && (me.to == 'Angeles University Foundation' || me.to == 'Angeles University Foundation Medical Center' || me.to == 'Diamond Subdivision' ||
    me.to == 'Fields Avenue' || me.to == 'Immaculate Concepcion Parish' || me.to == 'Main Gate Terminal' || me.to == 'SM City Clark' || me.to == 'Marisol' || me.to == 'Savers Mall' || me.to == 'Systems Plus College Foundation')){
      jeep1 = 'PANDAN-PAMPANG';
      jeep2 = 'CHECK-POINT-HOLY-HI-WAY';
      jeep1End = '15.142913,120.596736';
      jeep2End = '15.142963,120.596637';
      me.getJeep(jeep1,jeep2,null,null,jeep1End,jeep2End,null,null,'back','back');
      console.log('iffff');
    }

  }
  getJeep(jeep1,jeep2,jeep3,jeep4,end1,end2,end3,end4,ctr1,ctr2,ctr3,ctr4){
    var me = this;

    var data;
    var pointMarker2;
    var options = {};

    //jeep with 1 ride
    if (jeep2===null&&end2===null) {
        // options = {};
        options.end1 = end1;
        options.ctr1 = '1ride';
        options.ctr2 = ctr1;
        if (this.from=='Citi Center'&&(this.to!='Marquee Mall'&&this.to!='Angeles City Hall')) {
          console.log('cpoint');
          options.jeep_1= {coordi:'15.13784,120.58891|15.138251,120.589309|15.13927,120.59037|15.139734,120.590832|15.140435,120.591892|15.13884,120.593694|15.141057,120.595272|15.142838,120.596806|15.142905,120.596838|15.144619,120.59804|15.14872,120.601398|15.15103,120.603383|15.15372,120.60482|15.153224,120.605907|15.153255,120.605942|15.152749,120.607052|15.15239,120.60829|15.15181,120.60971|15.15181,120.60971|15.15239,120.60829|15.152749,120.607052|15.153255,120.605942|15.153224,120.605907|15.15372,120.60482|15.153783,120.604851|15.15366,120.604734|15.152624,120.60423|15.15103,120.603383|15.14872,120.601398|15.147082,120.600081|15.144619,120.59804|15.142913,120.596736|15.140787,120.595111|15.13990,120.59450|15.13834,120.59335|15.137245,120.592482|15.136417,120.590765|15.137761,120.588912|15.13784,120.58891|15.138251,120.589309|15.13927,120.59037',name:'PANDAN-PAMPANG',color:'Blue'};
        }

        else if(jeep1==='MARISOL-PAMPANG-Walking'&&(((this.from == 'Angeles Medical Center Inc.'||this.from=='Dr. Amando L. Garcia Medical Center, Inc.' ))&& this.to==='Lourdes North West')){
          options.jeep_1= {coordi:'15.14254,120.58971|15.14124,120.58907|15.14131,120.58783|15.14186,120.58799',name:'Walk through',color:'#FF7F50'};
        }
        else if (jeep1==='SAPANG BATO-ANGELES-walking'&&this.from=='Carmenville'&&this.to=='Timog Park Gate 1') {
          options.jeep_1= {coordi:'15.14539,120.56643|15.14505,120.56465',name:'Walk through',color:'#FF7F50'};
        }
        else if (jeep1==='MARISOL-PAMPANG-Walking'&&this.from=='Angeles Medical Center Inc.'&&this.to=='Dr. Amando L. Garcia Medical Center, Inc.') {
          options.jeep_1= {coordi:'15.14124,120.58907|15.14124,120.58907|15.14254,120.58971|15.14254,120.58971',name:'Walk through',color:'#FF7F50'};
          console.log('cr.');
          console.log(options);
        }
        else if (jeep1==='MARISOL-PAMPANG-Walking'&&this.to=='Angeles Medical Center Inc.'&&this.from=='Dr. Amando L. Garcia Medical Center, Inc.') {
          options.jeep_1= {coordi:'15.14254,120.58971|15.14254,120.58971|15.14124,120.58907|15.14124,120.58907',name:'Walk through',color:'#FF7F50'};
          console.log('cr.');
          console.log(options);
        }
        else {
          data = me.getJeepDocs(jeep1)
            .then(function(result) {
              options.jeep_1 = result;
              return options;
            });
        }
        pointMarker2 = me.getJeepMarkers(this.from).then(function(result) {


          if (this.from=='Marisol'&&(this.to=='Angeles Medical Center Inc.'||this.to=='Angeles University Foundation Medical Center'||this.to=='Angeles University Foundation'||this.to=='Dr. Amando L. Garcia Medical Center, Inc.'||this.to=='Holy Family Medical Center'||this.to == 'Holy Rosary Parish Church'||this.to=='Holy Angel University'||this.to=='Jenra Mall'||this.to=='Nepo Mall'||this.to=='Lourdes North West'||this.to == 'The Medical City Angeles')) {
            console.log('marisss');
            endCtrl = '15.15259,120.59180';
            mk2 = endCtrl.split(",");
            options.marker_1 = {lat:mk2[0],lng:mk2[1]};
            options.marker_1.text = 'Marisol Terminal';
            console.log(options);
          }
          else {console.log('qq');
            options.marker_1 = result;
          }

          return me.getJeepMarkers(this.to);
        }).then(function(result){
          options.marker_2 = result;
          return options;
        });
        pointMarker2.then(function(result) {
          GoogleMaps.init(options);
        });
    }
    else if (jeep3!==null) {
      options = {};
      if (this.from=='Citi Center') {
        console.log('cpoint');
        options.jeep_1= {coordi:'15.13784,120.58891|15.138251,120.589309|15.13927,120.59037|15.139734,120.590832|15.140435,120.591892|15.13884,120.593694|15.141057,120.595272|15.142838,120.596806|15.142905,120.596838|15.144619,120.59804|15.14872,120.601398|15.15103,120.603383|15.15372,120.60482|15.153224,120.605907|15.153255,120.605942|15.152749,120.607052|15.15239,120.60829|15.15181,120.60971|15.15181,120.60971|15.15239,120.60829|15.152749,120.607052|15.153255,120.605942|15.153224,120.605907|15.15372,120.60482|15.153783,120.604851|15.15366,120.604734|15.152624,120.60423|15.15103,120.603383|15.14872,120.601398|15.147082,120.600081|15.144619,120.59804|15.142913,120.596736|15.140787,120.595111|15.13990,120.59450|15.13834,120.59335|15.137245,120.592482|15.136417,120.590765|15.137761,120.588912|15.13784,120.58891|15.138251,120.589309|15.13927,120.59037',name:'PANDAN-PAMPANG',color:'Blue'};
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='MARISOL-PAMPANG-Walking'&&jeep2!=='SAPANG BATO-ANGELES') {
        options.jeep_1= {coordi:'15.14254,120.58971|15.14124,120.58907|15.14131,120.58783',name:'Walk through',color:'#FF7F50'};
        console.log('oooo1');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='MARISOL-PAMPANG-Walking'&&jeep2=='SAPANG BATO-ANGELES') {
        options.jeep_1= {coordi:'15.14254,120.58971|15.14124,120.58907|15.14131,120.58783|15.14186,120.58799',name:'Walk through',color:'#FF7F50'};
        console.log('oooo2');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='MARISOL-PAMPANG-Walking2'&&jeep2=='MARISOL-PAMPANG') {
        options.jeep_1= {coordi:'15.13417,120.59130|15.13483,120.59063',name:'Walk through',color:'#FF7F50'};
        console.log('oooo3');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='MARISOL-PAMPANG-Walking3'&&jeep2=='CHECK-POINT-HOLY') {
        options.jeep_1= {coordi:'15.13417,120.59130|15.13642,120.58772',name:'Walk through',color:'#FF7F50'};
        console.log('oooo4');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='MARISOL-PAMPANG-Walking5'&&jeep2=='CHECK-POINT-HOLY') {
        options.jeep_1= {coordi:'15.13567,120.58914|15.13622,120.58805|15.13642,120.58772',name:'Walk through',color:'#FF7F50'};
        console.log('oooo4');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='CHECK-POINT-HOLY-Walking4'&&jeep2=='CHECK-POINT-HOLY') {
        options.jeep_1= {coordi:'15.15293,120.59217|15.152962,120.591914|15.15259,120.59180',name:'Walk through',color:'#FF7F50'};
        console.log('moooo4');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else if (jeep1==='PANDAN-PAMPANG-Walking2'&&(jeep2=='CHECK-POINT-HOLY'||jeep2=='VILLA-PAMPANG')) {
        options.jeep_1= {coordi:'15.13927,120.59037|15.138251,120.589309|15.13784,120.58891',name:'Walk through',color:'#FF7F50'};
        console.log('moooo4');
        data = me.getJeepDocs(jeep2).then(function(result) {
          options.jeep_2 = result;
          console.log(result);
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });
      }
      else {
        data = me.getJeepDocs(jeep1)
        .then(function(result) {
          options.jeep_1 = result;
          return me.getJeepDocs(jeep2);
        })
        .then(function(result) {
          options.jeep_2 = result;
          return me.getJeepDocs(jeep3);
        }).
        then(function(result) {
          options.jeep_3 = result;
          return options;
        });


      }
      if (jeep4!==null) {
        me.getJeepDocs(jeep4).then(function(result) {
          console.log(result);
          console.log('asdf');
          options.jeep_4 = result;
        });
      }
      pointMarker2 = me.getJeepMarkers(this.from).then(function(result) {
        options.marker_1 = result;
        console.log(result);
        var endCtr;
        if (jeep1==='MARISOL-PAMPANG-Walking'&&jeep2!=='SAPANG BATO-ANGELES') {
          endCtr = '15.14131,120.58783';
          console.log('endCtr');
        }
        else if (jeep3!==undefined&&(this.from=='Anunas'||this.from=='Carmenville'||this.from=='City College of Angeles'||this.from=='Cuayan'||this.from=='Friendship'||this.from=='Friendship Plaza'||this.from=='Margot'||this.from=='Sapang Bato'||this.from=='Timog Park Gate 1'||this.from=='Timog Park Gate 2'||this.from=='Timog Park Gate 3'||this.from=='Timog Park Gate 3'||this.from=='Transfer'||this.from=='Villa Sol')&&(this.to=='Angeles City Hall'||this.to=='Citi Center'||this.to=='Marquee Mall'||this.to=='Republic Central Colleges')) {
          endCtr = '15.137851,120.588826';
        }
        else if (jeep3!==undefined&&(this.from=='Anunas'||this.from=='Carmenville'||this.from=='City College of Angeles'||this.from=='Cuayan'||this.from=='Friendship'||this.from=='Friendship Plaza'||this.from=='Margot'||this.from=='Sapang Bato'||this.from=='Timog Park Gate 1'||this.from=='Timog Park Gate 2'||this.from=='Timog Park Gate 3'||this.from=='Transfer'||this.from=='Villa Sol')&&(this.to=='Angeles University Foundation'||this.to=='Angeles University Foundation Medical Center')) {
          endCtr = '15.138817,120.587592';
        }
        else if (jeep3!==undefined&&this.from=='Anunas'&&this.to=='Dr. Amando L. Garcia Medical Center, Inc.') {
          endCtr = '15.14254,120.58971';
        }
        else if (jeep3!==undefined&&this.from=='Anunas'&&this.to=='Sacred Heart Medical Center') {
          endCtr = '15.13642,120.58772';
        }
        else if (jeep3!==undefined&&this.from=='Angeles City Hall'&&this.to=='Rafael Lazatin Memorial Medical Center') {
          endCtr = '15.13914,120.58746';
        }
        else if (jeep3!==undefined&&this.from=='Rafael Lazatin Memorial Medical Center'&&(this.to=='Angeles City Hall'||this.to=='Citi Center'||this.to=='Marquee Mall'||this.to=='Republic Central Colleges')) {
          endCtr = '15.13914,120.58746';
        }
        else if (jeep1==='MARISOL-PAMPANG-Walking2'&&jeep3!==undefined&&this.from=='Holy Angel University'&&(this.to=='Angeles City Hall'||this.to=='Citi Center'||this.to=='Marquee Mall'||this.to=='Republic Central Colleges')) {
          console.log('holi');
          endCtr = '15.137851,120.588826';
        }
        else if (jeep1==='MARISOL-PAMPANG-Walking2'&&jeep3!==undefined&&this.from=='Holy Angel University'&&(this.to=='Bancal'||this.to=='Lourdes North West')) {
          console.log('holi');
          endCtr = '15.13642,120.58772';
        }
        else if (jeep1==='CHECK-POINT-HOLY-Walking4'&&jeep3!==undefined&&this.from=='Marisol'&&(this.to == 'Timog Park Gate 1' || this.to == 'Timog Park Gate 2' || this.to == 'Timog Park Gate 3' || this.to == 'Transfer' || this.to == 'Villa Sol'|| this.to == 'Anunas' ||this.to == 'Carmenville' || this.to == 'City College of Angeles' || this.to == 'Cuayan' || this.to == 'Friendship' || this.to == 'Friendship Plaza')) {
          console.log('cp4');
          endCtr = '15.14186,120.58799';
        }
        else if (jeep4!==undefined&&(this.to=='Margot'||this.to=='Sapang Bato')) {
          console.log('jeep4 margt');
          endCtr = '15.16258,120.55349';
          var mk3 = endCtr.split(",");
          options.marker_3 = {lat:mk3[0],lng:mk3[1]};
        }
        else if (jeep4!==undefined&&this.from=='Holy Angel University'&&(this.to == 'Timog Park Gate 1' || this.to == 'Timog Park Gate 2' || this.to == 'Timog Park Gate 3' || this.to == 'Transfer' || this.to == 'Villa Sol'|| this.to == 'Anunas' ||this.to == 'Carmenville' || this.to == 'City College of Angeles' || this.to == 'Cuayan' || this.to == 'Friendship' || this.to == 'Friendship Plaza')) {
          console.log('jeep4 margt');
          endCtr = '15.14186,120.58799';
          var mk3a = endCtr.split(",");
          options.marker_3 = {lat:mk3a[0],lng:mk3a[1]};
        }
        else {
          endCtr = end3;
        }
        var mk2;
        var endCtrl;
        if (jeep4!==undefined&&(this.to=='Margot'||this.to=='Sapang Bato')) {
          endCtrl = '15.14186,120.58799';
          mk2 = endCtrl.split(",");
          options.marker_2 = {lat:mk2[0],lng:mk2[1]};
        }
        else if (jeep4!==undefined&&this.from=='Holy Angel University'&&(this.to == 'Timog Park Gate 1' || this.to == 'Timog Park Gate 2' || this.to == 'Timog Park Gate 3' || this.to == 'Transfer' || this.to == 'Villa Sol'|| this.to == 'Anunas' ||this.to == 'Carmenville' || this.to == 'City College of Angeles' || this.to == 'Cuayan' || this.to == 'Friendship' || this.to == 'Friendship Plaza')) {
          endCtrl = '15.13642,120.58772';
          mk2 = endCtrl.split(",");
          options.marker_2 = {lat:mk2[0],lng:mk2[1]};
        }
        else {
          mk2 = endCtr.split(",");
          options.marker_2 = {lat:mk2[0],lng:mk2[1]};
        }
        return me.getJeepMarkers(this.to);
      }).then(function(result2) {
        console.log(result2);
        console.log('jeeeep4');
        if (jeep4!==null) {
          options.marker_4 = result2[0];
        }
        else {
          options.marker_3 = result2[0];
        }
        return options;
    });
      options.end1 = end1;
      options.end2 = end2;
      options.end3 = end3;
      options.end4 = end4;
      options.ctr1=ctr1;
      options.ctr2=ctr2;
      options.ctr3=ctr3;
      options.ctr4=ctr4;
      pointMarker2.then(function(result) {
        console.log(result);
        GoogleMaps.init(options);
      });
    }
    else{
    console.log('2jeep');
    console.log(this.to);
        options = {};

        if (this.from=='Citi Center') {
          console.log('cpoint');
          options.jeep_1= {coordi:'15.13784,120.58891|15.138251,120.589309|15.13927,120.59037|15.139734,120.590832|15.140435,120.591892|15.13884,120.593694|15.141057,120.595272|15.142838,120.596806|15.142905,120.596838|15.144619,120.59804|15.14872,120.601398|15.15103,120.603383|15.15372,120.60482|15.153224,120.605907|15.153255,120.605942|15.152749,120.607052|15.15239,120.60829|15.15181,120.60971|15.15181,120.60971|15.15239,120.60829|15.152749,120.607052|15.153255,120.605942|15.153224,120.605907|15.15372,120.60482|15.153783,120.604851|15.15366,120.604734|15.152624,120.60423|15.15103,120.603383|15.14872,120.601398|15.147082,120.600081|15.144619,120.59804|15.142913,120.596736|15.140787,120.595111|15.13990,120.59450|15.13834,120.59335|15.137245,120.592482|15.136417,120.590765|15.137761,120.588912|15.13784,120.58891|15.138251,120.589309|15.13927,120.59037',name:'PANDAN-PAMPANG',color:'Blue'};
          var data4 = me.getJeepDocs(jeep2).then(function(result) {
            console.log(result);
            options.jeep_2 = result;
            return options;
          });
        }

        else if (jeep1==='MARISOL-PAMPANG-Walking'&&jeep2!=='SAPANG BATO-ANGELES') {
          console.log('a1');
          options.jeep_1= {coordi:'15.14254,120.58971|15.14124,120.58907|15.14131,120.58783',name:'Walk through',color:'#FF7F50'};
          var data2 = me.getJeepDocs(jeep2).then(function(result) {
            options.jeep_2 = result;

            console.log(result);
            return options;
          });
          console.log('walking');

        }
        else if (jeep1==='MARISOL-PAMPANG-Walking'&&jeep2==='SAPANG BATO-ANGELES') {
          console.log('a2');
          options.jeep_1= {coordi:'15.14254,120.58971|15.14124,120.58907|15.14131,120.58783|15.14186,120.58799',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep2).then(function(result) {
            options.jeep_2 = result;
            return options;
          });
          console.log('walking2 holy');

        }
        else if (jeep1==='SAPANG BATO-ANGELES'&&jeep2==='MARISOL-PAMPANG-Walking') {
          console.log('a2a');
          options.jeep_2= {coordi:'15.14186,120.58799|15.14131,120.58783|15.14124,120.58907|15.14254,120.58971',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep1).then(function(result) {
            options.jeep_1 = result;
            return options;
          });
        }
        else if (jeep1==='MARISOL-PAMPANG'&&jeep2==='MARISOL-PAMPANG-Walking4') {
          options.jeep_2= {coordi:'15.13483,120.59063|15.13417,120.59130',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep1).then(function(result) {
            options.jeep_1 = result;
            return options;
          });
        }
        else if (jeep1==='MARISOL-PAMPANG'&&jeep2==='VILLA-PAMPANG-Walking') {
          console.log('a3');
          options.jeep_2= {coordi:'15.13483,120.59063|15.13417,120.59130',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep1).then(function(result) {
            console.log(result);
            options.jeep_1 = result;
            return options;
          });
        }
        else if (jeep1=='CHECK-POINT-HENSONVILLE-HOLY'&&jeep2=='CHECK-POINT-HOLY-Walking'){
          console.log('cpoint');
          options.jeep_2= {coordi:'15.13642,120.58772|15.13622,120.58805|15.13567,120.58914',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep1).then(function(result) {
            console.log(result);
            options.jeep_1 = result;
            return options;
          });
        }
        else if (jeep1=='PANDAN-PAMPANG-Walking'&&jeep2=='PANDAN-PAMPANG'){
          console.log('cpoint');
          options.jeep_1= {coordi:'15.13567,120.58914|15.13622,120.58805|15.137851,120.588826',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep2).then(function(result) {
            console.log(result);
            options.jeep_2 = result;
            return options;
          });
        }
        else if (jeep1=='PANDAN-PAMPANG-Walking2'&&(jeep2=='MARISOL-PAMPANG'||jeep2=='CHECK-POINT-HENSONVILLE-HOLY'||jeep2=='CHECK-POINT-HOLY'||jeep2=='VILLA-PAMPANG')){
          console.log('cpoint');
          options.jeep_1= {coordi:'15.13927,120.59037|15.138251,120.589309|15.13784,120.58891',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep2).then(function(result) {
            console.log(result);
            console.log('kk');
            options.jeep_2 = result;
            return options;
          });
        }
        else if (jeep1==='CHECK-POINT-HENSONVILLE-HOLY'&&jeep2==='CHECK-POINT-HOLY-Walking2'){
          console.log('cpoint2');
          options.jeep_2= {coordi:'15.166388,120.582832|15.167272,120.584398|15.16840,120.58442',name:'Walk through',color:'#FF7F50'};
          console.log('jeep waliking');
          console.log(options.jeep_2);
          data = me.getJeepDocs(jeep1).then(function(result) {
            console.log(result);
            options.jeep_1 = result;
            return options;
          });
          console.log(options);
        }
        else if (jeep1==='CHECK-POINT-HENSONVILLE-HOLY'&&jeep2==='CHECK-POINT-HOLY-Walking3'){
          console.log('cpoint2');
          options.jeep_2= {coordi:'15.166388,120.582832|15.167272,120.584398|15.16834,120.58275',name:'Walk through',color:'#FF7F50'};
          console.log('jeep waliking');
          console.log(options.jeep_2);
          data = me.getJeepDocs(jeep1).then(function(result) {
            console.log(result);
            options.jeep_1 = result;
            return options;
          });
          console.log(options);
        }
        else if (jeep1==='MARISOL-PAMPANG-Walking2'&&jeep2==='MARISOL-PAMPANG'){
          console.log('walking 2');
          options.jeep_1= {coordi:'15.13417,120.59130|15.13483,120.59063',name:'Walk through',color:'#FF7F50'};
          data = me.getJeepDocs(jeep2).then(function(result) {
            console.log(result);
            options.jeep_2 = result;
            return options;
          });
          console.log(options);
        }
        else if (jeep1==='MARISOL-PAMPANG-Walking5'&&(jeep2=='CHECK-POINT-HENSONVILLE-HOLY'||jeep2=='CHECK-POINT-HOLY')) {
          options.jeep_1= {coordi:'15.13567,120.58914|15.13622,120.58805|15.13642,120.58772',name:'Walk through',color:'#FF7F50'};
          console.log('oooo4');
          data = me.getJeepDocs(jeep2).then(function(result) {
            options.jeep_2 = result;
            console.log(result);
            return options;
          });
        }
        else if (jeep1==='MAINGATE-FRIENDSHIP-Walking'&&jeep2=='MAINGATE-FRIENDSHIP') {
          options.jeep_1= {coordi:'15.16840,120.58442|15.166427,120.583066',name:'Walk through',color:'#FF7F50'};
          console.log('oooo4');
          data = me.getJeepDocs(jeep2).then(function(result) {
            options.jeep_2 = result;
            console.log(result);
            return options;
          });
        }
        else if (jeep1==='CHECK-POINT-HENSONVILLE-HOLY-Walking'&&jeep2=='CHECK-POINT-HENSONVILLE-HOLY') {
          options.jeep_1= {coordi:'15.16834,120.58275|15.166388,120.582832',name:'Walk through',color:'#FF7F50'};
          console.log('oooo4');
          data = me.getJeepDocs(jeep2).then(function(result) {
            options.jeep_2 = result;
            console.log(result);
            return options;
          });
        }
        else if (jeep1==='CHECK-POINT-HENSONVILLE-HOLY-Walking2'&&jeep2=='CHECK-POINT-HENSONVILLE-HOLY') {
          options.jeep_1= {coordi:'15.16840,120.58442|15.166388,120.582832',name:'Walk through',color:'#FF7F50'};
          console.log('oooo4');
          data = me.getJeepDocs(jeep2).then(function(result) {
            options.jeep_2 = result;
            console.log(result);
            return options;
          });
        }
        else if (jeep2==='CHECK-POINT-HOLY-Walking5'&&jeep1=='CHECK-POINT-HOLY') {
          options.jeep_2= {coordi:'15.13642,120.58772|15.13622,120.58805|15.13567,120.58914',name:'Walk through',color:'#FF7F50'};
          console.log('oooo4');
          data = me.getJeepDocs(jeep1).then(function(result) {
            options.jeep_1 = result;
            console.log(result);
            return options;
          });
        }

        else {
          console.log('elses');
          data = me.getJeepDocs(jeep1)
            .then(function(result) {
              options.jeep_1 = result;
              return me.getJeepDocs(jeep2);
            })
            .then(function(result) {
              options.jeep_2 = result;
              return options;
            });
        }
        console.log(this.to);

        pointMarker2 = me.getJeepMarkers(this.from).then(function(result) {
          console.log(this.to);

          if (this.from=='Marisol'&&(this.to=='Angeles City Hall'||this.to=='Citi Center'||this.to=='Marquee Mall'||this.to=='Republic Central Colleges'||this.to=='Sacred Heart Medical Center')) {
            endCtrl = '15.15259,120.59180';
            mk2 = endCtrl.split(",");
            options.marker_1 = {lat:mk2[0],lng:mk2[1]};
            options.marker_1.text = 'Marisol Terminal';
            console.log(options);
            console.log('1122');
          }
          else if (this.from=='Marisol' &&this.to == 'Rafael Lazatin Memorial Medical Center') {
            endCtrl = '15.15259,120.59180';
            mk2 = endCtrl.split(",");
            options.marker_1 = {lat:mk2[0],lng:mk2[1]};
            options.marker_1.text = 'Marisol';
            console.log(options);
          }


          else {
            options.marker_1 = result;
          }


          console.log('mm');
          console.log(result);
          console.log(me.to);
          return me.getJeepMarkers(me.to);
        }).then(function(result2) {
          console.log(result2);
          options.marker_2 = result2;
          return options;
        });

        options.end1 = end1;
        options.end2 = end2;
        console.log(end2);
        options.ctr1 = ctr1;
        options.ctr2 = ctr2;

        options.fromId = me.from;
        options.toId = me.to;

        pointMarker2.then(function(result) {
          console.log(result);
          console.log(options);
          me.googleMapsService.loadGoogleMaps(options);
        });
    }
  }
  getJeepDocs(jeep){

    return this.dataService.getJeepDetails(jeep).then((data) => {
      return data.res.rows[0];
      console.log(data.res.rows[0]);
    }, (error) => {
      console.log(error);
    });
  }

  getJeepMarkers(points){
    console.log(points);
    return this.dataService.getPointsOrigin(points).then((data) => {
      return data.res.rows[0];
      console.log(data.res.rows[0]);
    }, (error) => {
      console.log(error);
    });
  }



}
