import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistOkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist-ok',
  templateUrl: 'regist-ok.html',
})
export class RegistOkPage {
  private users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data:any  = this.navParams.get('data');
    this.users = data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistOkPage');
  }
  confirm(user: any) {
    this.navCtrl.push('RegistConfirmPage', { user: user });
  }

}
