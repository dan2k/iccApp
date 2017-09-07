import { url } from './../../config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the NetworkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {
  xurl: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.xurl = url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkPage');
  }

}
