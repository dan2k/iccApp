import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist-confirm',
  templateUrl: 'regist-confirm.html',
})
export class RegistConfirmPage {
  private user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user=this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistConfirmPage');
  }
  confirm() {
    this.navCtrl.push('RegistPwdPage', { user: this.user });
  }
  update() {
    this.navCtrl.push('RegistPlacePage', { user: this.user });
  }
}
