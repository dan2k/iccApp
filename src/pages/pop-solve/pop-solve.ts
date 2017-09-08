import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopSolvePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-solve',
  templateUrl: 'pop-solve.html',
})
export class PopSolvePage {
  public solve: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopSolvePage');
  }
  close() {
    this.viewCtrl.dismiss();
  }
  save() {
    if (!this.solve) {
      alert('กรุณาระบุการแก้ไข / ระดับความพึงพอใจ');
      return false;
    }
    let data = { solve: this.solve };
    this.viewCtrl.dismiss(data);

  }

}
