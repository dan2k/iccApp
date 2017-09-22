import { MessageProvider } from './../../providers/message/message';
import { SwProvider } from './../../providers/sw/sw';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SwPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sw',
  templateUrl: 'sw.html',
})
export class SwPage {
  token: string;
  userData: any;
  problemgroups: any;
  prob_gid: any;
  problem_sub_id: any;
  problem_sub2_id: any;
  problemsubs: any;
  problemsub2s: any;
  detail: any;
  svData: any;
  isUpdate: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sw: SwProvider,
    public view: ViewController,
    public msg: MessageProvider
  ) {
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.svData = this.navParams.get('svData');
    if (this.svData) {
      //update
      this.isUpdate = true;
      this.prob_gid = this.svData.prob_gid;
      this.problem_sub_id = this.svData.problem_sub_id;
      this.problem_sub2_id = this.svData.problem_sub2_id;
      this.detail = this.svData.sv_detail;
    }
    this.genProblemgroup();
  }
  genProblemsub() {
    let pg=this.prob_gid.split('||')
    this.sw.genProblemsub(this.token, this.userData.user_id,pg[0])
    .then((data: any) => {
      if (data.status) {
        this.problemsubs = data.data;
      }
    }, (err) => {

    });
  }
  genProblemgroup() {
    this.sw.genProblemgroup(this.token, this.userData.user_id)
      .then((data: any) => {
        if (data.status) {
          this.problemgroups = data.data;
        }
      }, (err) => {

      });
  }
  genProblemsub2() {
    let ps = this.problem_sub_id.split('||');
    this.sw.genProblemsub2(this.token, this.userData.user_id, ps[0])
      .then((data: any) => {
        if (data.status) {
          this.problemsub2s = data.data;
        }
      }, (err) => {

      });
  }
  change(data) {
    this.genProblemsub();
  }

  change2(data) {

    this.genProblemsub2();
  }
  save() {
    if (!this.prob_gid) {
      this.msg.alert('กรุณาระบุระบบงานด้วย');
      return false;
    }
    if (!this.problem_sub_id) {
      this.msg.alert('กรุณาระบุโปรแกรมด้วย');
      return false;
    }
    if (!this.problem_sub2_id) {
      this.msg.alert('กรุณาระบุอาการด้วย');
      return false;
    }
    if (!this.detail) {
      this.msg.alert('กรุณาระบุรายละเอียด');
      return false;
    }

    let pg = this.prob_gid.split('||');
    let ps = this.problem_sub_id.split('||');
    let data = {
      prob_gid: pg[0],
      prob_gdesc:pg[1],
      problem_sub_id: ps[0],
      problem_sub_desc: ps[1],
      problem_sub2_id:this.problem_sub2_id,
      detail: this.detail,
      problem_type: 'P2',
      contract_no:pg[2],
      work_type_id: '0',
    }
    this.view.dismiss(data);
  }
  close() {
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SwPage');
  }

}
