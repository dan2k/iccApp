import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { MessageProvider } from "../../providers/message/message";

/**
 * Generated class for the FollowupCustomerTotalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-followup-customer-total",
  templateUrl: "followup-customer-total.html"
})
export class FollowupCustomerTotalPage {
  items = [];
  userData: any;
  total: any;
  isShow: any = false;

  provinces: any=[];
  fProvince: any = "";
  svData: any;
  custptypes: any=[];
  custpcodes: any=[];
  uType: any;
  scope: any;
  fCustptype: any = "";
  fCustpcode: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public modalCtrl: ModalController
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    //this.genProvince();
    //this.genType();
    //this.genPcode();
  }
  genProvince() {
    let params = {};
    this.msg.postApi01("v1/genProvinceCustomer", params).then(
      (data: any) => {
        if (data.status) {
          this.provinces = data.data;
          //this.fProvince = 'xx';
        } else {
          console.log(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  genType() {
    let params = {
      uType: this.uType,
      scope: this.scope,
      pv: this.fProvince,
      userData: this.userData
    };
    this.msg.postApi01("v1/genPtypeCustomer", params).then(
      (data: any) => {
        if (data.status) {
          this.custptypes = data.data;
        } else {
          console.log(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  genPcode() {
    let params = {
      uType: this.uType,
      scope: this.scope,
      pv: this.fProvince,
      custptype: this.fCustptype,
      userData: this.userData
    };
    this.msg.postApi01("v1/genPcodeCustomer", params).then(
      (data: any) => {
        console.log("pv=", this.scope, data);
        if (data.status) {
          this.custpcodes = data.data;
        } else {
          console.log(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  changeProvince() {
    this.fCustptype = "";
    this.fCustpcode = "";
    this.genType();
    this.genPcode();
    this.items = [];
    this.getJob();
  }
  changePtype() {
    this.fCustpcode = "";
    this.genPcode();
    this.items = [];
    this.getJob();
  }
  changePcode() {
    this.items = [];
    this.getJob();
  }
  setShow() {
    this.isShow = true;
    if (this.provinces.length<1) {
      this.genProvince();
      this.genType();
      this.genPcode();

    }
    console.log('provinces==>',this.provinces)
    //this.genType();
    //this.genPcode();
  }
  setNotShow() {
    this.isShow = false;
  }
  getJob() {
    let lastRow = 0;
    this.items = [];
    console.log("length------------>", lastRow);
    let params = {
      userData: this.userData,
      lastRow: 0,
      cust_ptype: this.fCustptype,
      cust_pcode: this.fCustpcode,
      pv:this.fProvince,
    };
    this.msg.postApi01(`v1/getJobCustomerTotal`, params).then(
      (data: any) => {
        if (data.status) {
          let datax = data.data;
          let total = data.data.length;
          this.total = data.total;
          let j = 0;
          for (let i = 0; i < total; i++) {
            this.items.push(datax[j]);
            j++;
          }
          console.log("x1", this.items);
        } else {
          alert(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  doInfinite(infiniteScroll) {
    let lastRow = this.items.length;
    if (this.total == lastRow) {
      infiniteScroll.complete();
      return false;
    }
    let params = {
      userData: this.userData,
      lastRow: lastRow,
      cust_ptype: this.fCustptype,
      cust_pcode: this.fCustpcode,
      pv:this.fProvince,
    };
    this.msg.postApi01(`v1/getJobCustomerTotal`, params).then(
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
  openFollow(sv: any) {
    console.log("sv====>", sv);
    let follow = this.modalCtrl.create("FollowupProblemPage", { svData: sv });
    follow.onDidDismiss(() => {
      this.items = [];
      this.getJob();
      //console.log("msg=>", 1);
    });
    follow.present();
  }
  ionViewDidEnter() {
    // this.genProvince();
    // this.genType();
    // this.genPcode();
    this.getJob();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad FollowupCustomerSelfPage");
  }
}
