import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistPlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist-place',
  templateUrl: 'regist-place.html',
})
export class RegistPlacePage {
  public user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPlacePage');
  }

}
