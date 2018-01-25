import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';


/**
 * Generated class for the PmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pm',
  templateUrl: 'pm.html',
})
export class PmPage {
  public pmData: any;
  public userData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public modalCtrl: ModalController,
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));

  }
  getPm() {
    let params = {
      userData: this.userData
    };
    this.msg.postApi01('v1/listPm', params)
      .then((data: any) => {
        if (data.status) {
          //
          this.pmData = data.data;
          console.log('pmData==>', this.pmData);
        } else {
          console.log(data.msg);
        }
      }, err => {
        console.log(err);
      });
  }
  openDetail(pmData: any) {
    console.log('opend Detail------------------->');
    let modal = this.modalCtrl.create('PmDetailPage', { pmData: pmData });
    modal.onDidDismiss((data: any) => {
      this.getPm();
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PmPage');
  }
  ionViewDidEnter(){
    this.getPm();
  }

}
