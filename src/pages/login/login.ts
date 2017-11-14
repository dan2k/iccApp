//import { MessageProvider } from './../../providers/message/message';
import { HomePage } from './../home/home';
//import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { MessageProvider } from './../../providers/message/message';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
//import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';

//import * as CryptoJS from 'crypto-js/crypto-js';

//import CryptoJS from 'crypto-js';
//import { JwtHelper } from "angular2-jwt";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //providers: [UserProvider,MessageProvider]
})
export class LoginPage {
  tel: string;
  password: string;
  //private SECERET_KEY: string = 'mpsicctocontrold';
  loginType: any = 1;
  max: any;
  min: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private user: UserProvider,
    private alertCtrl: AlertController,
    public msg:MessageProvider,
    private modal: ModalController) {
    this.loginType = this.navParams.get('loginType');
    if (this.loginType == 1) {
      this.max = 10;
      this.min = 10;
    } else {
      this.max = 7;
      this.min = 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let params = {
      tel: this.tel,
      password: this.password,
      loginType:this.loginType
    };
    this.msg.postApi01(`v1/login`,params)
      .then((data: any) => {
        if (data.status) {
          let d = data.data;
          localStorage.setItem('userDataArr', JSON.stringify(d));
          if (d.length > 1) {
            //มากกว่าหนึ่งหน่วยงาน
            let modal = this.modal.create('SelectPlacePage', { data: d });
            modal.onDidDismiss((datax) => {
              if (datax) {
                localStorage.setItem('userData', JSON.stringify(datax));
                this.navCtrl.setRoot(HomePage);
              }
            });
            modal.present();
          } else {//กรณีที่มี 1 หน่วยงานเท่านั้น
            localStorage.setItem('userData', JSON.stringify(d[0]));
            this.navCtrl.setRoot(HomePage);
          }
        } else {
          this.showMsg('ไม่พบข้อมูลในระบบ');
        }
      }, err => {
        console.log(err);
      });
  }

  showMsg(msg: String) {
    let alert = this.alertCtrl.create({
      title: 'แจ้งเตือน',
      subTitle: `<span style="color:red;">${msg}</span>`,
      buttons: ['ตกลง'],

    });
    alert.present();
  }
  register() {
    //goto  register page
    this.navCtrl.push('RegisterPage');
  }




}
