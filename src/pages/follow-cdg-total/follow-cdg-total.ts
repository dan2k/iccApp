import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-follow-cdg-total',
  templateUrl: 'follow-cdg-total.html',
})
export class FollowCdgTotalPage {
  custptypes: any;
  token: any;
  userData: any;
  svData: any;
  custpcodes: any;
  uType: any;
  scope: any;
  provinces: any;
  userType: any;
  fProvince: any='';
  fCustptype: any='';
  fCustpcode: any = '';
  items: any;
  total: any;
  isShow: any = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public modalCtrol: ModalController,
  ) {
    this.userData=JSON.parse(localStorage.getItem('userData'));
    this.genProvince();
      //กำหนดค่า ของ listbox ให้ตรงกับจังหวัดของตัวเอง
      this.fProvince = this.userData.place_code.substr(0, 2);
      this.genType();
      this.genPcode();
  }
  setShow() {
    this.isShow = true;
  }
  setNotShow() {
    this.isShow = false;
  }
  genProvince() {
    console.log("uType=" + this.uType, "scope=" + this.scope);
    let params = {
    };
    //this.registerProvider.genProvince(this.uType, this.scope)
    this.msg.postApi01('v1/genProvinceCdgTotal',params)
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
      pv: this.fProvince,
      userData:this.userData
    }
    this.msg.postApi01('v1/genPtypeCdgTotal',params)
    .then((data: any) => {
      if (data.status) {
        this.custptypes = data.data

      } else {
        console.log(data.msg);
      }
    }, (err) => {
      console.log(err);
    });
  }

  genPcode() {
    console.log('สร้างหน่วยงานของ' + this.scope + '..............');
    let params = {
      pv: this.fProvince,
      custptype: this.fCustptype,
      userData: this.userData
    };
    this.msg.postApi01('v1/genPcodeCdgTotal',params)
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

  async getJob() {
    this.items = [];
    let lastRow = 0;
    let params = {
      userData: this.userData,
      cust_ptype: this.fCustptype,
      cust_pcode: this.fCustpcode,
      uType:this.uType,
      scope: this.scope,
      pv: this.fProvince,
      lastRow:lastRow,
    };
    this.msg.postApi01(`v1/getJobCdgTotal`,params)
      .then((data:any) => {
        if (data.status) {
          let datax = data.data;
          let total = data.data.length;
          this.total = data.total;
          let j = 0;
          for (let i = 0; i < total; i++) {
            this.items.push(datax[j]);
            j++;
          }
          console.log('items===>', datax);

        }else {
          alert(data.msg);
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
    this.items = [];
    this.getJob();
  }
  changePtype() {
    this.fCustpcode = '';
    this.genPcode();
    this.items = [];
    this.getJob();
  }
  changePcode() {
    this.items = [];
    this.getJob();
  }
  openJob(svData: any) {
    //รับจ๊อบจาก ข้าราชการเพื่อทำการวิเคราะห์และทำการแตกจ๊อบใหม่
    let page = 'FollowupProblemPage';
    let modal = this.modalCtrol.create(page, { svData: svData });
    modal.onDidDismiss(() => {
      this.items = [];
      this.getJob();
    });
    modal.present();
  }

  doInfinite(infiniteScroll) {
    let lastRow = this.items.length;

    if (this.total == lastRow) {
      infiniteScroll.complete();
      return false;
    }
    let params = {
      userData: this.userData,
      cust_ptype: this.fCustptype,
      cust_pcode: this.fCustpcode,
      uType:this.uType,
      scope: this.scope,
      pv: this.fProvince,
      lastRow:lastRow,
    };
    this.msg.postApi01(`v1/getJobCdgSelf`, params).then(
      (data: any) => {
        if (data.status) {
          let datax = data.data;
          let total = datax.length;
          console.log(this.items);

          console.log("datax-load", datax);
          for (let i = 0; i < total; i++) {
            this.items.push(datax[i]);
          }
          console.log("item-before", this.items);
          infiniteScroll.complete();
        } else {
          alert(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  ionViewDidEnter() {
    this.items = [];
    this.getJob();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MaincdgPage');
  }

}
