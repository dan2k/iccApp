import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the FollowCdgSelfPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-follow-cdg-self',
  templateUrl: 'follow-cdg-self.html',
})
export class FollowCdgSelfPage {
  custptypes: any=[];
  token: any;
  userData: any;
  svData: any;
  custpcodes: any=[];
  uType: any;
  scope: any;
  provinces: any=[];
  userType: any;
  fProvince: any='';
  fCustptype: any='';
  fCustpcode: any = '';
  items: any=[];
  total: any;
  isShow: any = false;
  isData: any = false;
  tmp: any=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public modalCtrol: ModalController,
  ) {
    this.userData=JSON.parse(localStorage.getItem('userData'));
    this.uType = this.userData.place_type;
    this.userType = this.userData.user_type;
    this.scope = '';

    if (this.uType == 'P') {// PV
      this.scope=this.userData.place_code.substr(0, 2);
    } else if (this.uType == 'R') {// RG
      this.scope = this.userData.sect_id.substr(1,1);
    } else {// Center
      this.scope = '';
    }

    //this.genType();
    //this.genProvince();
    //กำหนดค่า ของ listbox ให้ตรงกับจังหวัดของตัวเอง
    this.fProvince = this.userData.place_code.substr(0, 2);
    //this.genPcode();
    //this.getJob();
  }
  setShow() {
    this.isShow = true;
    console.log('provinces==>', this.provinces);
    if (this.provinces.length < 1) {
      this.genProvince();
      this.genType();
      this.genPcode();
    }
  }
  setNotShow() {
    this.isShow = false;
  }
  getItems(ev) {
    // Reset items back to all of the items
    //this.getJob();
    // set val to the value of the ev target

    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.tmp.filter((item) => {
        return (item.msv_detail.toLowerCase().indexOf(val.toLowerCase()) > -1)||(item.thiname.toLowerCase().indexOf(val.toLowerCase()) > -1)||(item.cust_pdesc.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.items = this.tmp;
    }
  }
  genProvince() {
    console.log("uType=" + this.uType, "scope=" + this.scope);
    let params = {
      uType: this.uType,
      scope: this.scope
    };
    //this.registerProvider.genProvince(this.uType, this.scope)
    this.msg.postApi01('v1/genProvinceCdgSelf',params)
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
      pv: this.fProvince,
      userData:this.userData
    }
    this.msg.postApi01('v1/genPtypeCdgSelf',params)
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
      custptype: this.fCustptype,
      userData: this.userData
    };
    this.msg.postApi01('v1/genPcodeCdgSelf',params)
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
    this.msg.postApi01(`v1/getJobCdgSelf`,params)
      .then((data:any) => {
        if (data.status) {

          //this.svData = data.data;
          //console.log(this.svData);


          let datax = data.data;
          let total = data.data.length;
          this.total = data.total;
          let j = 0;
          for (let i = 0; i < total; i++) {
            this.items.push(datax[j]);
            j++;
          }
          this.tmp = this.items;
          if (this.items.length < 1) {
            this.isData = false;
          }
          console.log('items===>', datax);

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
     // this.items = [];
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
          // console.log('total=>' + total);
          // console.log('item-before',this.items);
          console.log("datax-load", datax);
          for (let i = 0; i < total; i++) {
            this.items.push(datax[i]);
          }
          this.tmp = this.items;
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
