import { MessageProvider } from './../../providers/message/message';
import { url } from './../../config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
//import { HwProvider } from '../../providers/hw/hw';


/**
 * Generated class for the PopEquipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-equip',
  templateUrl: 'pop-equip.html',
})
export class PopEquipPage {
  equip: any;
  urlx: string = `${url}/img/equip/`;
  symptoms: any;
  detail: string;
  token: string;
  userData: any;
  problem_sub_id: any;
  problem_sub2_id: any;
  prob_gid: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    //public hw: HwProvider,
    public msg:MessageProvider
  ) {
    this.equip = this.navParams.get('equip');
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.listSymptom();
    console.log('getProblemsub');
    this.getProblemsub();
    console.log('getProblemsub');
  }
  errorHandler(event) {
    console.debug(event);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopEquipPage');
  }
  change(s) {
    console.log('problem_sub2_id=' + this.problem_sub2_id);
    //alert(this.problem_sub2_id);
  }
  getProblemsub() {
    let params = {
      user_id: this.userData.user_id,
      pno:this.equip.pno
    };
    this.msg.postApi01('v1/getProblemsub',params)
      .then((data: any) => {
        if (data.status) {
          this.problem_sub_id = data.data[0].problem_sub_id;
          this.prob_gid = data.data[0].prob_gid;
        } else {
          console.log(data.msg);
        }
      }, (err) => {
        console.log(err);
      });
  }
  // getProblemsub() {
  //   this.hw.getProblemsub(this.token, this.userData.user_id, this.equip.pno)
  //     .then((data: any) => {
  //       if (data.status) {
  //         this.problem_sub_id = data.data[0].problem_sub_id;
  //         this.prob_gid = data.data[0].prob_gid;
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  listSymptom() {
    let params = {
      user_id: this.userData.user_id,
      pno: this.equip.pno
    }
    this.msg.postApi01('v1/listSymptom', params)
      .then((data:any) => {
        if (data.status) {
          this.symptoms = data.data;
        } else {
          console.log(data.msg)
        }
      }, (err) => {
        console.log(err);
      });
  }
  // listSymptom() {
  //   this.hw.listSymptom(this.token, this.userData.user_id, this.equip.pno)
  //     .then((data: any) => {
  //       if (data.status) {
  //         this.symptoms = data.data;
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  close() {
    if (!this.problem_sub2_id) {
      this.msg.alert('กรุณาระบุอาการเสีย')
      return false;
    }
    if (!this.detail) {
      this.msg.alert('กรุณาระบุรายละเอียด')
      return false;
    }

    this.viewCtrl.dismiss({
      data: {
        equip: this.equip,
        detail: this.detail,
        problem_sub_id: this.problem_sub_id,
        problem_sub2_id: this.problem_sub2_id,
        prob_gid: this.prob_gid
      }
    });
  }
}
