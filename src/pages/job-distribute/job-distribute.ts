import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-job-distribute',
  templateUrl: 'job-distribute.html',
})
export class JobDistributePage {
  svData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl:ModalController
  ) {
    this.svData = this.navParams.get('svData');
    console.log(this.svData);
  }
  close() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDistributePage');
  }
  openJob(type: any) {
    let page = '';

    switch (type) {
      case 1: page = 'HwPage'; break;
      case 2: page = 'HwPage'; break;
      case 3: page = 'OtherPage'; break;
    }

    let modal = this.modalCtrl.create(page, { svData: this.svData });
    modal.present();
  }
}
