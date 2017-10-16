import { RegisterProvider } from './../../providers/register/register';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [RegisterProvider]
})
export class RegisterPage {
  // private custPtypes: any;
  // private custPtype: any;
  // private provinceid: any;
  // private provinces: any;
  public fname: String;
  public lname: String;
  // @ViewChild('_custPtype') _custPtype;
  // @ViewChild('_provinceid') _provinceid;
  @ViewChild('_fname') _fname;
  @ViewChild('_lname') _lname;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private registerProvider: RegisterProvider,
    private alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    // this.registerProvider.genPtype()
    //   .then((data: any) => {
    //     //console.log(data);
    //     if (data.status) this.custPtypes = data.data;

    //   }, (err) => {
    //     console.log(err);
    //   });
    // this.registerProvider.genProvince()
    //   .then((data: any) => {
    //     console.log(data);
    //     if (data.status) this.provinces = data.data;
    //   }, (err) => {
    //     console.log(err);
    //   });
  }
  chekRegister() {
    //console.log(this.custPtype);
    // if (!this.custPtype) {
    //   this.showMsg('กรุณาเลือกประเภทหน่วยงาน');
    //   return false;
    // }
    // if (!this.provinceid) {
    //   this.showMsg('กรุณาเลือกจังหวัด');
    //   return false;
    // }
    if (!this.fname) {
      this.showMsg('กรุณาระบุชื่อ',this._fname);
      this._fname.setFocus();
      return false;
    }
    if (!this.lname) {
      this.showMsg('กรุณาระบุชื่อสกุล',this._lname);

      return false;
    }
    let data:any = {
      // custPtype: this.custPtype,
      // provinceid: this.provinceid,
      fname: this.fname,
      lname: this.lname
     }
    this.registerProvider.ckRegist(data)
      .then((data: any) => {
        console.log(data);
        if (data.status) {
          let user = data.data;
          if (user.length > 0) {
            // goto ok
            this.navCtrl.push('RegistOkPage', { data: data });
          } else {
            // goto no
            this.navCtrl.push('RegistNoPage');
          }
        }
      }, (err) => {
        console.log(err);
    })  ;
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
