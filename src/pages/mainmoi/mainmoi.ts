import { RegisterProvider } from './../../providers/register/register';
import { MessageProvider } from './../../providers/message/message';
import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the MainmoiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainmoi',
  templateUrl: 'mainmoi.html',
  providers: [ServiceProvider, MessageProvider, RegisterProvider]
})
export class MainmoiPage {
  custptypes: any;
  token: any;
  userData: any;
  svData: any;
  custpcodes: any;
  uType: any;
  scope: any;
  provinces: any;
  fProvince: any = '';
  fCustptype: any = '';
  fCustpcode: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public serviceProvider: ServiceProvider,
    public msg: MessageProvider,
    public registerProvider: RegisterProvider
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.token = localStorage.getItem('token');
    this.scope = '';
    let jobid = this.userData.job_id;
    if (jobid == 2) {
      this.uType = 'P';
    } else if (jobid == 3) {
      this.uType = 'R';
    } else if (jobid == 4) {
      this.uType = 'M';
    }
    if (this.uType == 'P') {// PV
      this.scope = this.userData.cc;
    } else if (this.uType == 'R') {// RG
      this.scope = this.userData.section_id;
    } else {// Center
      this.scope = '';
    }

    this.genType();
    this.genProvince();
    this.genPcode();
    this.getJob();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainmoiPage');
  }
  genProvince() {
    console.log("uType=" + this.uType, "scope=" + this.scope);
    this.registerProvider.genProvince(this.uType, this.scope)
      .then((data: any) => {
        if (data.status) {
          this.provinces = data.data;
        } else {
          console.log(data);
        }
      }, (err) => {
        console.log(err);
      });
  }
  genType() {
    this.registerProvider.genPtype(this.uType, this.scope, this.fProvince)
      .then((data: any) => {
        if (data.status) {
          this.custptypes = data.data
        } else {
          console.log(data);
        }
      }, (err) => {
        console.log(err);

      });
  }
  genPcode() {
    console.log('สร้างหน่วยงานของ' + this.scope + '..............');
    this.registerProvider.genPcode(this.uType, this.scope, this.fProvince, this.fCustptype)
      .then((data: any) => {
        console.log('pv=', this.scope, data);
        if (data.status) {
          this.custpcodes = data.data;
        } else {
          console.log(data);
        }
      }, (err) => {
        console.log(err);
      });
  }
  async getJob() {
    this.serviceProvider.getJob(this.token, this.userData.user_id, this.fCustptype, this.fCustpcode, this.uType, this.scope, this.fProvince)
      .then((data: any) => {
        if (data.status) {
          this.svData = data.data;
        } else {
          console.log(data);
          // let isExpired = /Expired token/g.test(data.msg);
          // let isVerification = /Signature verification/g.test(data.msg);
          // console.log(`isExpired=${isExpired},isVerification=${isVerification}`);
        }
      }, (err) => {
        console.log(err);
      });
  }
  changeProvince() {
    this.fCustptype = '';
    this.fCustpcode = '';
    this.genType();
    this.genPcode();
    this.getJob();
  }
  changePtype() {
    this.fCustpcode = '';
    this.genPcode();
    this.getJob();
  }
  changePcode() {
    this.getJob();
  }
  showProblem(type: any) {
    let problem = this.modalCtrl.create('ModalProblemPage', { type: type });
    problem.onDidDismiss(() => {
      this.getJob();
    });
    problem.present();
  }
  openFollow(svData: any) {
    let follow = this.modalCtrl.create('FollowupProblemPage', { svData: svData });
    follow.onDidDismiss(() => {
      this.getJob();
      console.log('msg=>', 1);
    });
    follow.present();
  }
}
