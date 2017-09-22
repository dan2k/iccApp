import { HwProvider } from './../../providers/hw/hw';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController,PopoverController } from 'ionic-angular';
import { url } from '../../config';
import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-job-distribute',
  templateUrl: 'job-distribute.html',

})
export class JobDistributePage {
  svData: any;
  worktypes: any;
  token: any;
  userData: any;
  isHw: boolean = false;
  isSet: boolean = false;
  isEquip: boolean = false;

  work_type_id: any;
  equip_set_id: any;
  equipset: any;
  equips: any;
  urlx: string = `${url}/img/equip/`;
  problems: Array<any> = [];
  probid: any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public hw: HwProvider,
    public pop: PopoverController,
    public msg:MessageProvider
  ) {
    this.svData = this.navParams.get('svData');
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.svData);
  }
  errorHandler(event) {
    console.debug(event);
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
  getEquipset(work_type_id: any) {
    this.work_type_id = work_type_id;
    this.hw.getEquipset(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode, work_type_id)
      .then((data: any) => {
        //console.log(data.data);
        this.equipset = data.data;
        this.isSet = true;
        this.isEquip = false;
      }, (err) => {

      });

  }
  listEquip(work_type_id, equip_set_id) {
    this.equip_set_id = equip_set_id;
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
  popEquip(equip: any,myEvent) {
    let pop = this.pop.create('PopEquipPage',{equip: equip });
    pop.onDidDismiss((data: any) => {
       if (data) {
         console.log(data);
         let p = {
           probid:this.probid,
           equip_set_id: data.data.equip.equip_set_id,
           work_type_id:  data.data.equip.work_type_id,
           pno: data.data.equip.pno,
           equip_set_desc: data.data.equip.equip_set_desc,
           work_type_desc: data.data.equip.work_type_desc,
           sno: data.data.equip.sno,
           pic: data.data.equip.pic,
           contract_no:data.data.equip.contract_no,
           problem_type: 'P1',
           prob_gid: data.data.prob_gid,
           problem_sub_id: data.data.problem_sub_id,
           problem_sub2_id:data.data.problem_sub2_id,
           detail: data.data.detail,
          //  cust_ptype: this.svData.cust_ptype,
          //  cust_pcode: this.svData.cust_pcode,
          //  user_id: this.svData.msv_uid,
           //sv_date: this.svData.msv_adate,
           //sv_time: this.svData.msv_time,


         }
         this.problems.push(p);
         let sno = data.data.equip.sno;
         let pno = data.data.equip.pno;
         let sid = data.data.equip.equip_set_id;
         let wid = data.data.equip.work_type_id;
         /*let index = this.equips.findIndex((i:any) => {
           return i.sno == sno;
         });

         console.log('index=', index);
         this.equips=this.equips.slice(index, 1);
         */
        this.equips = this.equips.filter(obj => !(obj.sno === sno && obj.pno===pno && obj.equip_set_id===sid && obj.work_type_id===wid));
         console.log('problems=>', this.problems);
         console.log('equips=>', this.equips);
         this.probid++;
      }
    });
    pop.present(/*{
      ev: myEvent
    }*/);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDistributePage');
  }
  openJob(type: any) {
    if (type == 1) {
      this.getWorktype();
      this.isHw = true;
      this.isSet = false;
      this.isEquip = false;
      this.worktypes = null;
      this.equipset = null;
      this.equips = null;
      return false;
    } else if (type == 2) {
      this.isHw = false;
      this.isSet = false;
      this.isEquip = false;
      //return false;
    }
    let page = '';

    switch (type) {
      case 1: page = 'HwPage'; break;
      case 2: page = 'SwPage'; break;
      case 3: page = 'OtherPage'; break;
    }

    let modal = this.modalCtrl.create(page, { svData: this.svData });
    modal.onDidDismiss((data: any) => {
      if (data) {
        let p = {
          probid:this.probid,
          equip_set_id: 0,
          work_type_id:  0,
          pno: '',
          equip_set_desc: '',
          work_type_desc: '',
          sno: '',
          pic: '',
          contract_no: data.contract_no,
          problem_type: 'P2',
          prob_gid: data.prob_gid,
          problem_sub_id: data.problem_sub_id,
          problem_sub2_id: data.problem_sub2_id,
          prob_gdesc: data.prob_gdesc,
          problem_sub_desc:data.problem_sub_desc,
          detail: data.detail,
          // cust_ptype: this.svData.cust_ptype,
          // cust_pcode: this.svData.cust_pcode,
          // user_id: this.svData.msv_uid,
        }
        this.problems.push(p);
        this.probid++;
      }
    });
    modal.present();
  }
  create() {
    console.log(this.problems);
    let params = {
      data: this.problems,
      user_id: this.userData.user_id,
      cust_ptype: this.svData.cust_ptype,
      cust_pcode: this.svData.cust_pcode,
      msv_uid: this.svData.msv_uid,
      msv_no:this.svData.msv_no,
    };
    this.msg.postApi(this.token,'createSv',params)
      .then((data: any) => {
        if (data.status) {
          console.log(data.data);
          this.close();
        }
      }, (err) => {
        console.log(err);
      });
  }
  delete(probid) {
    this.problems = this.problems.filter(obj => (obj.probid !== probid));
    this.listEquip(this.work_type_id, this.equip_set_id)

  }
}
