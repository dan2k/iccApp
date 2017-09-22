import { MessageProvider } from './../../providers/message/message';
import { url } from './../../config';
import { HwProvider } from './../../providers/hw/hw';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hw',
  templateUrl: 'hw.html',
  providers:[HwProvider]
})
export class HwPage {
  public token: any;
  public userData: any;
  public svData: any;
  public worktypes: any;
  public equipset: Array<any> = [];
  public isSet: boolean= false;
  public isEquip: boolean = false;
  public work_type_id: any;
  public work_type_desc: any;
  public equip_set_id: any;
  public equip_set_desc: any;
  public prob_gid: any;
  public prob_gdesc: any;
  public problem_sub_id: any;
  public problem_sub_desc: any;
  public problem_sub2_id: any;
  public problem_sub2_desc: any;
  public detail: any;
  public problemsub2s: any;

  public equips: any;
  public problems: Array<any>=[];
  public urlx: string = `${url}/img/equip/`;
  public sno: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public hw: HwProvider,
    public msg: MessageProvider,
  ) {
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.svData = this.navParams.get('svData');
    this.getWorktype();
    this.work_type_id = this.svData.work_type_id;
    this.work_type_desc = this.svData.work_type_desc;
    this.equip_set_id = this.svData.equip_set_id;
    this.equip_set_desc = this.svData.equip_set_desc;
    this.prob_gid = this.svData.prob_gid;
    this.prob_gdesc = this.svData.prob_gdesc;
    this.problem_sub_id = this.svData.problem_sub_id;
    this.problem_sub_desc = this.svData.problem_sub_desc;
    //this.problem_sub2_id = this.svData.problem_sub2_id;
    this.problem_sub2_desc = this.svData.problem_sub2_desc;
    this.sno = this.svData.sv_sn;
    this.detail = this.svData.msv_detail;
    this.listSymptom();
    this.problem_sub2_id = this.svData.problem_sub2_id;

  }
  errorHandler(event) {
    console.debug(event);
  }
  listSymptom() {
    let params = {
      user_id: this.userData.user_id,
      pno: this.problem_sub_desc
    }
    this.msg.postApi(this.token, 'listSymptom', params)
      .then((data:any) => {
        if (data.status) {
          this.problemsub2s = data.data;
        }
      }, (err) => {
        console.log(err);
      });
  }
  getWorktype() {
    this.hw.getWorktype(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode)
      .then((data: any) => {
        if (data.status) {
          this.worktypes = data.data;
        }
      }, (err) => {
        console.log(err);
      });
  }
  getEquipset(work_type_id: any,work_type_desc:any) {
    this.work_type_id = work_type_id;
    this.work_type_desc = work_type_desc;
    this.equip_set_id = null;
    this.equip_set_desc = null;
    this.prob_gid = null;
    this.prob_gdesc = null;
    this.problem_sub_id = null;
    this.problem_sub_desc = null;
    this.problem_sub2_id = null;
    this.problem_sub2_desc = null;
    this.sno = null;
    this.problemsub2s = null;

    this.hw.getEquipset(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode, work_type_id)
      .then((data: any) => {
        //console.log(data.data);
        this.equipset = data.data;
        this.isSet = true;
        this.isEquip = false;
      }, (err) => {

      });

  }
  listEquip(work_type_id, equip_set_id,equip_set_desc) {
    this.equip_set_id = equip_set_id;
    this.equip_set_desc = equip_set_desc;
    this.prob_gid = null;
    this.prob_gdesc = null;
    this.problem_sub_id = null;
    this.problem_sub_desc = null;
    this.problem_sub2_id = null;
    this.problem_sub2_desc = null;
    this.sno = null;
    this.detail = null;
    this.problemsub2s = null;
    this.hw.listEquip(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode, work_type_id, equip_set_id)
      .then((data: any) => {
        this.equips = data.data;
        for (let i = 0; i<this.problems.length; i++){
          let sno = this.problems[i].sno;
          let pno = this.problems[i].pno;
          let sid = this.problems[i].equip_set_id;
          let wid = this.problems[i].work_type_id;
          this.equips = this.equips.filter(obj => !(obj.sno === sno && obj.pno===pno && obj.equip_set_id===sid && obj.work_type_id===wid));
        }
        this.isEquip = true;
      }, (err) => {
        console.log(err);
      });
  }
  setPno(equip: any) {
    this.problem_sub_desc = equip.pno;
    this.problem_sub2_id = null;
    this.problem_sub2_desc = null;
    this.sno = equip.sno;
    this.detail = null;
    this.listSymptom();
  }
  updateSv() {

    // this.work_type_id = this.svData.work_type_id;
    // this.work_type_desc = this.svData.work_type_desc;
    // this.equip_set_id = this.svData.equip_set_id;
    // this.equip_set_desc = this.svData.equip_set_desc;
    // this.prob_gid = this.svData.prob_gid;
    // this.prob_gdesc = this.svData.prob_gdesc;
    // this.problem_sub_id = this.svData.problem_sub_id;
    // this.problem_sub_desc = this.svData.problem_sub_desc;
    //this.problem_sub2_id = this.svData.problem_sub2_id;
    // this.problem_sub2_desc = this.svData.problem_sub2_desc;
    // this.sno = this.svData.sv_sn;
    // this.detail = this.svData.msv_detail;
    // this.listSymptom();
    // this.problem_sub2_id = this.svData.problem_sub2_id;
    // this.problem_sub2_id = this.svData.problem_sub2_id;

    if(!this.work_type_id) {
      this.msg.alert('กรุณาระบุระบบงาน');
      return false;
    }
    if (!this.equip_set_id){
      this.msg.alert('กรุณาระบุเครื่อง');
      return false;
    }
    if (!this.problem_sub_desc) {
      this.msg.alert('กรุณาเลือกอุปกรณ์');
      return false;
    }
    if (!this.problem_sub2_id) {
      this.msg.alert('กรุณาระบุอาการ');
      return false;
    }
    if (!this.detail) {
      this.msg.alert('กรุณาระบุรายละเอียด');
      return false;
    }
    let params = {
      user_id: this.userData.user_id,
      sv_no: this.svData.msv_no,
      work_type_id: this.work_type_id,
      equip_set_id: this.equip_set_id,
      problem_sub_desc: this.problem_sub_desc,
      problem_sub2_id: this.problem_sub2_id,
      sno: this.sno,
      detail:this.detail,
    };


    this.msg.postApi(this.token, 'hwEdit', params)
      .then((data:any) => {
        if (data.status) {
          this.close();
        }
      }, (err) => {
        console.log(err);
      });
  }
  /* getWorktype() {
    this.hw.getWorktype(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode)
      .then((data: any) => {
        if (data.status) {
          this.worktypes = data.data;
          for (let i = 0; i < this.worktypes.length;i++) {
             this.getEquipset(this.worktypes[i].work_type_id);
          }
          console.log('equipset=' + this.equipset);
        }
      }, (err) => {
        console.log(err);
      });
  }


  getEquipset(work_type_id: any) {
    this.hw.getEquipset(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode, work_type_id)
      .then((data: any) => {
        //console.log(data.data);
        this.equipset[work_type_id]=data.data;
      }, (err) => {

      });

  }


  listEquip(work_type_id: any, equip_set_id: any) {
    console.log(work_type_id, equip_set_id);
  } */


  ionViewDidLoad() {
    console.log('ionViewDidLoad HwPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
