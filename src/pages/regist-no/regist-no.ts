import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MessageProvider } from "../../providers/message/message";

@IonicPage()
@Component({
  selector: "page-regist-no",
  templateUrl: "regist-no.html"
})
export class RegistNoPage {
  user_fname: any;
  user_lname: any;
  user_title: any;
  user_tel: any;
  cust_desc: any;
  cc: any;
  provinces: any;
  user_id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider
  ) {
    this.genProvince();
  }
  genProvince() {
    //console.log("uType=" + this.uType, "scope=" + this.scope);
    let params = {
      uType: "C",
      scope: ""
    };
    //this.registerProvider.genProvince(this.uType, this.scope)
    this.msg.postApi01("v1/genProvince", params).then(
      (data: any) => {
        console.log("province=====>", data);
        if (data.status) {
          this.provinces = data.data;
          console.log(this.provinces);
        } else {
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistNoPage");
  }
  save() {
    let params = {
      user_id: this.user_id,
      user_title: this.user_title,
      user_fname: this.user_fname,
      user_lname: this.user_lname,
      user_tel: this.user_tel,
      cust_desc: this.cust_desc,
      cc: this.cc
    };
    console.log(params);
    this.msg.postApi01("v1/saveUserTmp", params).then(
      (data: any) => {
        if (data.status) {
          console.log("add data to cen_user_tmp ok.");
          this.msg.alert("บันทึกข้อมูลเรียบร้อยแล้ว");
          this.navCtrl.setRoot("LoginTypePage");
        } else {
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
//จบการทำงาน
