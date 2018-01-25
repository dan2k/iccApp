import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {
  svData: any;
  assists: any;
  userData: any;
  assist1: any;
  assist2: any;
  isBattery: boolean = false;
  battery_flag: boolean = false;
  draw_flag: boolean = false;
  isHW: boolean = false;
  isDraw: boolean = false;
  battery_amt: number;
  battery_tot: number;
  pnos: any;
  pno: any;
  snos: any;
  sno: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public msg:MessageProvider,public viewCtrl:ViewController) {
    this.svData = this.navParams.get('svData');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.genAssist();
    this.assist1 = this.userData.user_id;
    this.isBattery = this.svData.prob_gdesc == 'UPS' ? true : false;
    this.isHW = this.svData.msv_type == '1' ? true : false;
    console.log(this.svData);
  }
  setBattery() {
    if (this.battery_flag) {
      this.isDraw = false;
      this.draw_flag = false;
      console.log(this.isHW, this.battery_flag);
      this.getAmtBattery();
    } else {
      this.isDraw = true;
      this.draw_flag = false;
    }
  }
  setDraw() {
    if (this.draw_flag) {
      this.genPno();
    }
  }
  genAssist() {
    let params = {
      empid:this.userData.user_id
    };
    this.msg.postApi01('v1/genAssistant', params)
      .then((data: any) => {
        if (data.status) {
          this.assists = data.data;
        } else {
          console.log(data);
        }
      }, err => {
        console.log(err);
      });
  }
  getAmtBattery() {
    let params = {
      empid: this.userData.user_id
    };
    this.msg.postApi01('v1/getAmtBattery', params)
      .then((data: any) => {
        if (data.status) {
          console.log(data);
          this.battery_tot = data.tot_amt;
          if (this.battery_tot < 1) {
            alert('จำนวนแบ็ตเตอรี่ใน stock เท่ากับ 0 ไม่สามารถเบิกแบ็ตได้');
            this.battery_flag = false;
          } else {
            this.battery_amt = this.battery_tot;
          }
        } else {
          console.log(data);
        }
      }, err => {
        console.log(err);
      });
  }
  genPno() {
    let params = {
      pno: this.svData.problem_sub_desc,
      empid:this.userData.user_id
    };
    this.msg.postApi01('v1/genPno', params)
      .then((data: any) => {
        if (data.status) {
          this.pnos= data.data;
          if (this.pnos.length < 1) {
            alert('ไม่พบอุปกรณ์ใน stock');
            this.draw_flag = false;
          }
        } else {
          console.log(data);
        }
      }, err => {
        console.log(err);
      });
  }
  genSno(pno:any) {
    let params = {
      pno: pno,
      empid:this.userData.user_id
    };
    this.msg.postApi01('v1/genSno', params)
      .then((data:any) => {
        if (data.status) {
          this.snos = data.data;
        } else {
          console.log(data);
        }
      }, err => {
        console.log(err);
       });
  }
  save() {
    //this.msg.toast(this.assist1);
    if (!this.assist1) {
      this.msg.alert('กรุณาเลือกผู้ดำเนินการ 1');
      return false;
    }

    if (this.assist1 == this.assist2) {
      this.msg.alert('ผู้ดำเนินการ 1 และ ผู้ดำเนินการ 2 ต้องไม่เป็นคนเดียวกัน');
      return false;
    }
    if (this.battery_flag&&this.battery_amt<1) {
      this.msg.alert('กรุณาระบุจำนวนแบ็ตเตอรี่');
      return false;
    }
    if (this.draw_flag && !this.pno) {
      this.msg.alert('กรุณาระบุอุปกรณ์');
      return false;
    }
    if (this.pno && !this.sno) {
      this.msg.alert('กรุณาระบุ serial');
      return false;
    }
    let params = {
      svno: this.svData.msv_no,
      assist1: this.assist1,
      assist2:(this.assist2?this.assist2:''),
      sv_flag: 1,
      draw_flag: (this.draw_flag ? 1 : 0),
      user_id: this.userData.user_id,
      placetype: this.userData.place_type,
      placecode: this.userData.place_code,
      cust_ptype: this.svData.cust_ptype,
      cust_pcode:this.svData.cust_pcode,
      dept_id:this.userData.dept_id,
      pno: (this.draw_flag?this.pno:''),
      sno: (this.draw_flag? this.sno : ''),
      wpno:'BAT- UPS',
      battery_amt: (this.battery_flag ? this.battery_amt : 0),
      battery_tot: (this.battery_flag ? this.battery_tot : 0),
      battery_flag:(this.battery_flag?1:0),
    };
    this.msg.postApi01('v1/service', params)
      .then((data:any) => {
        if (data.status) {
          this.msg.toast(data.msg);
          this.viewCtrl.dismiss();
        } else {
          this.msg.toast(data.msg);
          console.log(data);
        }
      }, err => {
        console.log(err);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePage');
  }
  close() {
    this.viewCtrl.dismiss();
  }

}
