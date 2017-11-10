//import { ServiceProvider } from './../../providers/service/service';
//mport { RegisterProvider } from './../../providers/register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the MaincdgPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maincdg',
  templateUrl: 'maincdg.html',
  //providers:[RegisterProvider,ServiceProvider,MessageProvider]
})
export class MaincdgPage {
  custptypes: any;
  token: any;
  userData: any;
  svData: any;
  custpcodes: any;
  uType: any;
  scope: any;
  provinces: any;
  // cust_ptype: any = '';
  // cust_pcode: any = '';
  // pv: any = '';

  fProvince: any='';
  fCustptype: any='';
  fCustpcode: any='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public serviceProvider: ServiceProvider,
    //public registerProvider: RegisterProvider,
    public modalCtrol: ModalController,
    public msg:MessageProvider
  ) {
    this.token = localStorage.getItem('token');
    let tmp:any=JSON.parse(localStorage.getItem('userData'));
    // this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userData = tmp;
    this.uType = this.userData.place_type;
    this.scope = '';

    if (this.uType == 'P') {// PV
      this.scope=this.userData.place_code.substr(0, 2);
    } else if (this.uType == 'R') {// RG

      this.scope = this.userData.sect_id.substr(1,1);
    } else {// Center
      this.scope = '';
    }

    this.genType();
    this.genProvince();
    //กำหนดค่า ของ listbox ให้ตรงกับจังหวัดของตัวเอง
    this.fProvince = this.userData.place_code.substr(0, 2);
    this.genPcode();
    this.getJob();

  }
  genProvince() {
    console.log("uType=" + this.uType, "scope=" + this.scope);
    let params = {
      uType: this.uType,
      scope: this.scope
    };
    //this.registerProvider.genProvince(this.uType, this.scope)
    this.msg.postApi01('v1/genProvince',params)
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
    let params = {
      uType: this.uType,
      scope: this.scope,
      pv:this.fProvince
    }
    this.msg.postApi01('v1/genPtype',params)
    .then((data: any) => {
      if (data.status) {
        this.custptypes=data.data
      } else {
        console.log(data.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }
  // genType() {
  //   this.registerProvider.genPtype(this.uType,this.scope,this.fProvince)
  //   .then((data: any) => {
  //     if (data.status) {
  //       this.custptypes=data.data
  //     } else {
  //       console.log(data);
  //     }
  //   }, (err) => {
  //     console.log(err);

  //   });
  // }
  genPcode() {
    console.log('สร้างหน่วยงานของ' + this.scope + '..............');
    let params = {
      uType: this.uType,
      scope: this.scope,
      pv: this.fProvince,
      custptype:this.fCustptype
    };
    this.msg.postApi01('v1/genPcode',params)
    .then((data: any) => {
      console.log('pv=',this.scope,data);
      if (data.status) {
        this.custpcodes = data.data;
      } else {
        console.log(data.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }
  // genPcode() {
  //   console.log('สร้างหน่วยงานของ'+this.scope+'..............');
  //   this.registerProvider.genPcode(this.uType,this.scope,this.fProvince,this.fCustptype)
  //   .then((data: any) => {
  //     console.log('pv=',this.scope,data);
  //     if (data.status) {
  //       this.custpcodes = data.data;
  //     } else {
  //       console.log(data);
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  async getJob() {
    let params = {
      userData: this.userData,
      cust_ptype: this.fCustptype,
      cust_pcode: this.fCustpcode,
      uType:this.uType,
      scope: this.scope,
      pv:this.fProvince,
    };
    this.msg.postApi01(`v1/getJob`,{params})
      .then((data:any) => {
        if (data.status) {

          this.svData = data.data;
          console.log(this.svData);
        }else {
          alert(data.msg);
        }
      }, (err) => {
        console.log(err);
      });
  }
  // getJob() {
  //   console.log('getJob......');
  //   console.log('------------------>', this.userData);
  //   this.serviceProvider.getJob(this.token, this.userData.user_id,this.fCustptype,this.fCustpcode,this.uType,this.scope,this.fProvince)
  //   .then((data: any) => {

  //     if (data.status) {
  //       this.svData = data.data;
  //     } else {
  //       console.log(data);
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
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
  openJob(svData: any) {
    //รับจ๊อบจาก ข้าราชการเพื่อทำการวิเคราะห์และทำการแตกจ๊อบใหม่
    let page = 'FollowupProblemPage';
    let modal = this.modalCtrol.create(page, { svData: svData });
    modal.onDidDismiss(() => {
      this.getJob();
    });
    modal.present();
  }
  // openFollow(svData: any) {
  //   let follow = this.modalCtrol.create('FollowupProblemPage', { svData: svData });
  //   follow.onDidDismiss(() => {
  //     this.getJob();
  //     console.log('msg=>', 1);
  //   });
  //   follow.present();
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MaincdgPage');
  }
}
