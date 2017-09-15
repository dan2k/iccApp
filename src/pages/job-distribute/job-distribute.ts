import { HwProvider } from './../../providers/hw/hw';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { url } from '../../config';

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
  equipset: any;
  equips: any;
  urlx: string = `${url}/img/equip/`;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public hw: HwProvider
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

    this.hw.listEquip(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode, work_type_id, equip_set_id)
      .then((data: any) => {
        this.equips = data.data;
        this.isEquip = true;
      }, (err) => {
        console.log(err);
      });
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

      return false;
    }
    let page = '';

    switch (type) {
      case 1: page = 'HwPage'; break;
      case 2: page = 'HwPage'; break;
      case 3: page = 'OtherPage'; break;
    }

    let modal = this.modalCtrl.create(page, { svData: this.svData });
    modal.present();
  }
}
