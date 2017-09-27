import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

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
})
export class Tab3Page {
  public signatureImage : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController) {
    this.signatureImage = navParams.get('signatureImage');
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
