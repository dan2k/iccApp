import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//import { Sim } from "@ionic-native/sim";


/**
 * Generated class for the Tab3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-tab3',
    templateUrl: 'tab3.html',
    //providers:[Sim]
})
export class Tab3Page {
  public signatureImage : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    //public sim: Sim
  ) {
    this.signatureImage = navParams.get('signatureImage');



    // this.sim.getSimInfo().then(
    //   (info) => console.log('Sim info: ', info),
    //   (err) => console.log('Unable to get sim info: ', err)
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }
  openSignatureModel(){
    setTimeout(() => {
       let modal = this.modalCtrl.create('SignaturePage');
    modal.present();
    }, 300);
  }

}
