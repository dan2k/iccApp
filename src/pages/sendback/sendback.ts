import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,FabContainer,ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the SendbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendback',
  templateUrl: 'sendback.html',
})
export class SendbackPage {
  svData: any;
  userData: any;
  pnos: any;
  cars: any;
  causes: any;
  cause: any;
  isDraw: boolean= true;
  isRepair: boolean = false;
  isCar: boolean = false;
  startdate: any= new Date().toISOString();;
  enddate: any= new Date().toISOString();
  solve: any;
  repair_type: any;
  tagno: any;
  symptom: any;
  car_type: number;
  carno: any;
  from: number;
  to: number;
  //ssno: any;
  //spno: any;
  equips: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public msg: MessageProvider,
    public modal:ModalController,
  ) {
    this.svData = this.navParams.get('svData');
    console.log('svData==>',this.svData);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getCause();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendbackPage');
  }


  getCause() {
    let params = {};
    this.msg.postApi01('v1/genCause', params)
      .then((data: any) => {
        if (data.status) {
          this.causes = data.data;
        } else {
          console.log(data);
        }
       }, err => {
        console.log(err)
      });
  }
  getListPart() {
    let params = {
      sno: this.svData.osno
    };
    this.msg.postApi01('v1/getListPart', params)
      .then((data: any) => {
        this.equips = [];
        if (data.status) {
          for (let i = 0; i < data.data.length; i++){
            let item = {
              id: i,
              opno: data.data[i].pno,
              opno_desc: data.data[i].pno_desc,
              osno: data.data[i].sno,
              npno: '',
              npno_desc:'',
              nsno: '',
              tagno: '',
              symptom: ''
            };
            this.equips.push(item);
          }
        }
      }, err => {
        console.log(err);
      });
  }
  setRepairType(type: any) {
    if (type == 4) {
      this.getListPart();
    }
  }
  setHw() {
    this.repair_type = null;
    this.tagno = null;
    this.symptom = null;
  }
  setClearCar() {
    this.car_type = null;
    this.carno = null;
    this.from = null;
    this.to = null;
  }
  getCar() {
    let params = {
      place_type: this.userData.place_type,
      place_code:this.userData.place_code
    };
    this.msg.postApi01('v1/genCar', params)
      .then((data: any) => {
        if (data.status) {
          this.cars = data.data;
        } else {
          console.log(data);
        }
       }, err => {
        console.log(err)
      });
  }
  setCar(type:any) {
    if (type == 1) {
      this.getCar();
    } else {
      this.from = 0;
      this.to = 0;
    }
  }
  setMeter(car:any) {
    this.from = car.car_meter;
    this.to = car.car_meter;
  }

  close() {
    this.viewCtrl.dismiss();
  }
  setPart(event, fab: FabContainer, equip: any,action:number) {
    fab.close();
    if (action == 3) {//ยกเลิกรายการ
      for (let i = 0; i < this.equips.length; i++){
        if (this.equips[i].id == equip.id) {
          this.equips[i].npno = '';
          this.equips[i].npno_desc = '';
          this.equips[i].nsno = '';
          this.equips[i].tagno = '';
          this.equips[i].symptom = '';
        }
      }
      return false;
    }
    let modal = this.modal.create('SetPartPage', { equip: equip });
    modal.onDidDismiss((data: any) => {
      //
      for (let i = 0; i < this.equips.length; i++){
        if (this.equips[i].id == data.id) {
          this.equips[i].npno = data.npno;
          this.equips[i].npno_desc = data.npno_desc;
          this.equips[i].nsno = data.nsno;
          this.equips[i].tagno = data.tagno;
          this.equips[i].symptom = data.symptom;
        }
      }
    });
    modal.present();
    //this.navCtrl.push(TrashPage);
  }
  save() {
    if (!this.startdate) {
      this.msg.toast('กรุณาระบุวันเวลา เริ่มต้น');
      return false;
    }
    if (!this.enddate) {
      this.msg.toast('กรุณาระบุวันเวลา สิ้นสุด');
      return false;
    }
    if (!this.solve) {
      this.msg.toast('กรุณาระบุ การแก้ไข');
      return false;
    }
    if (!this.cause) {
      this.msg.toast('กรุณาระบุ สาเหตุ');
      return false;
    }
    if (this.svData.draw_flag == 1 && this.svData.battery_flag != 1 && !this.isRepair && !this.repair_type) {
      this.msg.toast('กรุณาระบุ ประเภทการส่งคืน');
      return false;
    }
    if (this.repair_type == 3&&!this.tagno) {
      this.msg.toast('กรุณาระบุ tagno');
      return false;
    }
    if (this.repair_type == 3&&!this.symptom) {
      this.msg.toast('กรุณาระบุ อาการเสีย');
      return false;
    }
    let equips: any =[];
    if (this.repair_type == 4) {
      console.log(this.equips);
      for (let i=0; i<this.equips.length; i++){
        if (this.equips[i].nsno!=="") {
          equips.push(this.equips[i]);
        }
      }
      console.log('equips==>', equips);
      if (equips.length < 1) {
        this.msg.toast('กรุณาระบุ ข้อมูลอุปกรณ์ที่พบปัญหา');
        return false;
      }
    }
    if (this.isCar) {
      if (!this.car_type) {
        this.msg.toast('กรุณาระบุ ประเภทการใช้รถ');
        return false;
      }
      if (this.car_type == 1&&!this.carno) {
        this.msg.toast('กรุณาระบุ ทะเบียนรถ');
        return false;
      }
      if (this.car_type&&this.from<1) {
        this.msg.toast('กรุณาระบุ ไมค์เริ่มต้น');
        return false;
      }
      if (this.car_type&&this.to<1) {
        this.msg.toast('กรุณาระบุ ไมค์สิ้นสุด');
        return false;
      }
      if (this.from > this.to) {
        this.msg.toast('ไมค์รถเริ่มต้นต้องไม่มากกว่าไมค์สิ้นสุด');
        return false;
      }
    }
    let starttmp = this.startdate.split('T');
    let endtmp = this.enddate.split('T');
    let startdate = starttmp[0];
    let starttmpTime = starttmp[1].split('Z');
    let starttime = starttmpTime[0];
    let enddate = endtmp[0];
    let endtmpTime = endtmp[1].split('Z');
    let endtime = endtmpTime[0];
    let params = {
      sv_solve_detail: this.svData.sv_solve_detail,
      sv_no:this.svData.msv_no,
      repair_flag: (this.isRepair ? 1 : 0),
      draw_flag: this.svData.draw_flag,
      battery_flag: this.svData.battery_flag,
      sv_flag: this.svData.sv_flag,
      doc_no: this.svData.doc_no,
      status_id: 6,
      start_date: startdate,
      start_time: starttime,
      stop_date: enddate,
      stop_time: endtime,
      solve: this.solve,
      return_type: this.repair_type?this.repair_type:'',
      serial_new: this.svData.osno,
      partno: this.svData.opno,
      tag_no: this.tagno?this.tagno:'',
      symptom: this.symptom?this.symptom:'',
      pno: this.svData.problem_sub_desc,
      sno: this.svData.sv_sn,
      equips: equips,
      isCar: this.isCar?1:0,
      car_type: this.car_type,
      car_id: (this.carno)?this.carno.car_id:'',
      car_meter: this.from?this.from:'',
      return_meter:this.to?this.to:'',
      user_id: this.userData.user_id,
      dept_id:this.userData.dept_id,
      problem_sub_desc: this.svData.problem_sub_desc,
      sv_sn: this.svData.sv_sn,
      cust_ptype: this.svData.cust_ptype,
      cust_pcode: this.svData.cust_pcode,
      placetype: this.userData.place_type,
      placecode:this.userData.place_code,
      contract_no:this.svData.contract_no,
      cause: this.cause,
    }
    console.log(params);
    this.msg.postApi01('v1/sendback', params)
      .then((data: any) => {
        if (data.status) {
          //console.log(data.data);
          this.msg.alert('ส่งคืนเรียบร้อยแล้ว');
          this.viewCtrl.dismiss();
        } else {
          console.log(data);
        }
      }, err => {
        console.log(err);
      });

  }

}
