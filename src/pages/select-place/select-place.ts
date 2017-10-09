import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SelectPlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-place',
  templateUrl: 'select-place.html',
})
export class SelectPlacePage {
  data: any;
  place: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
    this.data = this.navParams.get('data');
    console.log(this.data);
  }
  close() {
    this.navCtrl.pop();
  }
  confirm() {
    this.view.dismiss(this.place);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPlacePage');
  }

}
