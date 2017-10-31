//import { MessageProvider } from './../../providers/message/message';
import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
//import * as CryptoJS from 'crypto-js/crypto-js';
import { JwtHelper } from "angular2-jwt";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserProvider]
})
export class LoginPage {
  tel: string;
  password: string;
  //private SECERET_KEY: string = 'mpsicc';
  loginType: any = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private alertCtrl: AlertController,
    private modal: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.user.login(this.tel, this.password, this.loginType)
      .then((data: any) => {
        if (data.status) {
          let jwtHelper = new JwtHelper();
          let d = jwtHelper.decodeToken(data.data);
          //console.log('dddddddddddd', d);
          //console.log('isExpired=>', jwtHelper.isTokenExpired(data.data));
          //console.log('getExpired=>', jwtHelper.getTokenExpirationDate(data.data));

          localStorage.setItem('token', data.data);//token

          //console.log("userData=>", d.data);

          //console.log('user====>',JSON.stringify(d.data));
          console.log('length===>', d.data.length);
          if (d.data.length > 1) {
            //มากกว่าหนึ่งหน่วยงาน
            let modal = this.modal.create('SelectPlacePage', { data: d.data });
            modal.onDidDismiss((datax) => {
              if (datax) {
                //localStorage.setItem('token', data.data);//token
                localStorage.setItem('userData', JSON.stringify(datax));
                this.navCtrl.setRoot(HomePage);
              }
            });
            modal.present();
          } else {
            //console.log('yyyyyyyyyyyyy',d.data[0]);
            localStorage.setItem('userData', JSON.stringify(d.data[0]));
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
