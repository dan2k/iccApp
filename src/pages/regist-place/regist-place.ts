import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-regist-place',
  templateUrl: 'regist-place.html',
})
export class RegistPlacePage {
  public user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    console.log('update set profile');
    console.log('change place for me');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
    console.log('update set profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPlacePage');
  }

}
