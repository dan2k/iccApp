import { RegisterProvider } from './../../providers/register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegistPwdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist-pwd',
  templateUrl: 'regist-pwd.html',
  providers: [RegisterProvider]
  
})
export class RegistPwdPage {
  private phoneNumber: any;
  private password: any;
  private repassword: any;
  private user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public registerProvider: RegisterProvider
  ) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPwdPage');
  }
  checkData() {
    let tel = this.phoneNumber.replace(/-/g, '').replace(/[^0-9]/g, '');
    if (tel.length < 10) {
      this.showMsg('กรุณาระบุเบอร์โทรให้ครบ');
      return false;
    }
    if (this.password.length < 8) {
      this.showMsg('รหัสผ่านต้องยาวอย่างน้อย 8 ');
      return false;
    }
    if (this.password != this.repassword) {
      this.showMsg('ระบุรหัสผ่านให้ตรงกัน');
      return false;
    }
    
    let user = {
      user_id: this.user.user_id,
      cust_ptype: this.user.cust_ptype,
      user_rcode: this.user.user_rcode,
      password: this.password,
      user_tel:tel
    }
    this.registerProvider.updaePwd(user)
      .then((data: any) => {
        if (data.status) {
          this.navCtrl.setRoot('LoginPage');
        } 
        console.log(data.msg);  
      }, (err) => {
        console.log(err);
      });
  }
 
  showMsg(msg,obj?:any) {
    let alt = this.alertCtrl.create({
      title: `แจ้งเตือน`,
      subTitle: `${msg}`,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            if(obj)  obj.setFocus();
          }
        }
      ]
    });
    alt.present();
  }
}
