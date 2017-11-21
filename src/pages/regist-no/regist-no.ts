import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-regist-no',
  templateUrl: 'regist-no.html',
})
export class RegistNoPage {
  fname: any;
  lname: any;
  tel: any;
  codename: any;
  province: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public msg:MessageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistNoPage');
  }
  save() {
    this.msg.alert('บันทึกข้อมูลเรียบร้อยแล้ว');
    this.navCtrl.setRoot('LoginTypePage');
  }
}
