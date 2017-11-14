import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  userDataArr: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal:ModalController) {
    this.userDataArr = JSON.parse(localStorage.getItem('userDataArr'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  selectplace() {

    let modal = this.modal.create('SelectPlacePage', { data: this.userDataArr });
    modal.onDidDismiss((datax) => {
      if (datax) {
        localStorage.setItem('userData', JSON.stringify(datax));
        this.navCtrl.setRoot(HomePage);
      }
    });
    modal.present();
  }
}
