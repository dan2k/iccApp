import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { MessageProvider } from "../../providers/message/message";

/**
 * Generated class for the SetPartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-set-part",
  templateUrl: "set-part.html"
})
export class SetPartPage {
  equip: any;
  userData: any;
  pno: any;
  pnos: any;
  sno: any;
  tagno: any;
  symptom: any;
  pno_desc: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public viewCtrl: ViewController
  ) {
    this.equip = this.navParams.get("equip");
    console.log("equip==>", this.equip);
    this.getPno();
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }
  close() {
    this.viewCtrl.dismiss(this.equip);
  }
  save() {
    if (!this.pno) {
      this.msg.toast("กรุณาเลือก part อุปกรณ์");
      return false;
    }
    if (!this.sno) {
      this.msg.toast("กรุณาระบุ serial อุปกรณ์");
      return false;
    }
    if (!this.tagno) {
      this.msg.toast("กรุณาระบุ Tagno อุปกรณ์");
      return false;
    }
    if (!this.symptom) {
      this.msg.toast("กรุณาระบุ อาการเสีย อุปกรณ์");
      return false;
    }
    let params = { tagno: this.tagno };
    this.msg.postApi01("v1/ckTagno", params).then(
      (data: any) => {
        if (data.status) {
          if (data.data[0].dup > 0) {
            this.msg.toast("มี tagno นี้ในฐานข้อมูลแล้ว");
          } else {
            this.equip.npno = this.pno;
            this.equip.nsno = this.sno;
            this.equip.tagno = this.tagno;
            this.equip.symptom = this.symptom;
            this.equip.npno_desc = this.pno_desc;
            this.viewCtrl.dismiss(this.equip);
          }
        } else {
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  setPnoDesc(pnoDesc: any) {
    this.pno_desc = pnoDesc;
  }
  getPno() {
    let params = { pno: this.equip.opno };
    this.msg.postApi01("v1/genPnoWithType", params).then(
      (data: any) => {
        if (data.status) {
          this.pnos = data.data;
          console.log(this.pnos);
          if (this.equip.nsno != "") {
            //edit
            this.pno = this.equip.npno;
            this.pno_desc = this.equip.npno_desc;
            this.sno = this.equip.nsno;
            this.tagno = this.equip.tagno;
            this.symptom = this.equip.symptom;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SetPartPage");
  }
}
