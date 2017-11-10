import { MessageProvider } from './../../providers/message/message';
//import { SwProvider } from './../../providers/sw/sw';
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
  contract_no: any;
  prob_gdesc: any;
  problem_sub_desc: any;
  problem_sub2_desc: any;
  detail: any;
  svData: any;
  isUpdate: boolean = false;
  isFirst = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public sw: SwProvider,
    public view: ViewController,
    public msg: MessageProvider
  ) {
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.svData = this.navParams.get('svData');
    this.genProblemgroup();
    if (this.svData) {
      this.isUpdate = true;
      this.contract_no = this.svData.contract_no;
      this.detail = this.svData.msv_detail;
      console.log('svData====>', this.svData);
    }

  }
  genProblemgroup() {
    this.problemsubs = null;
    let params = {
      userData:this.userData
    };
    this.msg.postApi01('v1/genProblemgroup',params)
      .then((data: any) => {
        if (data.status) {
          this.problemgroups = data.data;
          if (this.isUpdate && this.isFirst) {
            this.prob_gid = this.svData.prob_gid;
            this.prob_gdesc = this.svData.prob_gdesc;
            this.genProblemsub();
          }
        }
      }, (err) => {

      });
    // this.sw.genProblemgroup(this.token, this.userData.user_id)
    //   .then((data: any) => {
    //     if (data.status) {
    //       this.problemgroups = data.data;
    //       if (this.isUpdate && this.isFirst) {
    //         this.prob_gid = this.svData.prob_gid;
    //         this.prob_gdesc = this.svData.prob_gdesc;
    //         this.genProblemsub();
    //       }
    //     }
    //   }, (err) => {

    //   });
  }
  genProblemsub() {
    let params = {
      userData: this.userData,
      prob_gid:this.prob_gid
    };
    this.msg.postApi01('v1/genProblemsub',params)
    .then((data: any) => {
      if (data.status) {
        this.problemsubs = data.data;
        if (this.isUpdate && this.isFirst) {
          this.problem_sub_id = this.svData.problem_sub_id;
          this.problem_sub_desc = this.svData.problem_sub_desc;
          this.genProblemsub2();
        } else {
          this.problem_sub_id = null;
        }
      }
    }, (err) => {

    });
  }
  // genProblemsub() {
  //   this.sw.genProblemsub(this.token, this.userData.user_id,this.prob_gid)
  //   .then((data: any) => {
  //     if (data.status) {
  //       this.problemsubs = data.data;
  //       if (this.isUpdate && this.isFirst) {
  //         this.problem_sub_id = this.svData.problem_sub_id;
  //         this.problem_sub_desc = this.svData.problem_sub_desc;
  //         this.genProblemsub2();
  //       } else {
  //         this.problem_sub_id = null;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  genProblemsub2() {
    let params = {
      userData: this.userData,
      problem_sub_id:this.problem_sub_id
    };
    this.msg.postApi01('v1/genProblemsub2',params)
      .then((data: any) => {
        if (data.status) {
          this.problemsub2s = data.data;
          if (this.isUpdate && this.isFirst) {
            this.problem_sub2_id = this.svData.problem_sub2_id;
            this.problem_sub2_desc = this.svData.problem_sub2_desc;
            this.isFirst = false;
          } else {
            this.problem_sub2_id = null;
          }
        }
      }, (err) => {
      });
  }
  // genProblemsub2() {
  //   this.sw.genProblemsub2(this.token, this.userData.user_id, this.problem_sub_id)
  //     .then((data: any) => {
  //       if (data.status) {
  //         this.problemsub2s = data.data;
  //         if (this.isUpdate && this.isFirst) {
  //           this.problem_sub2_id = this.svData.problem_sub2_id;
  //           this.problem_sub2_desc = this.svData.problem_sub2_desc;
  //           this.isFirst = false;
  //         } else {
  //           this.problem_sub2_id = null;
  //         }
  //       }
  //     }, (err) => {
  //     });
  // }
  change(data) {
    this.genProblemsub();
  }

  change2(data) {

    this.genProblemsub2();
  }
  // show(p) {
  //   console.log('select====>', p);
  // }
  select1(p: any) {
    this.prob_gdesc = p.prob_desc;
    this.contract_no = p.contract_no;
  }

  select2(p:any) {
    this.problem_sub_desc = p.problem_sub_desc;
  }
  select3(p:any) {
    this.problem_sub2_desc = p.problem_sub2_desc;
  }
  /*setContract(contract: any) {
    this.contract_no = contract;
  }*/
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

    let data = {
      user_id: this.userData.user_id,
      sv_no:this.svData.msv_no,
      prob_gid: this.prob_gid,
      problem_sub_id: this.problem_sub_id,
      problem_sub2_id:this.problem_sub2_id,
      detail: this.detail,
      problem_type: 'P2',
      contract_no:this.contract_no,
    }
    console.log(data);
    if (this.isUpdate) {
      let params = data;
      this.msg.postApi01('v1/swEdit', params)
        .then((data:any) => {
          if (data.status) {
            this.svData.prob_gid = this.prob_gid;
            this.svData.prob_gdesc = this.prob_gdesc;
            this.svData.problem_sub_id = this.problem_sub_id;
            this.svData.problem_sub_desc = this.problem_sub_desc;
            this.svData.problem_sub2_id = this.problem_sub2_id;
            this.svData.problem_sub2_desc = this.problem_sub2_desc;
            this.svData.msv_detail = this.detail;
            this.svData.contract_no = this.contract_no;
            this.view.dismiss(this.svData);
          }
        }, (err) => {
          console.log(err);
        });
      // this.msg.postApi(this.token, 'swEdit', data)
      //   .then((data:any) => {
      //     if (data.status) {
      //       this.svData.prob_gid = this.prob_gid;
      //       this.svData.prob_gdesc = this.prob_gdesc;
      //       this.svData.problem_sub_id = this.problem_sub_id;
      //       this.svData.problem_sub_desc = this.problem_sub_desc;
      //       this.svData.problem_sub2_id = this.problem_sub2_id;
      //       this.svData.problem_sub2_desc = this.problem_sub2_desc;
      //       this.svData.msv_detail = this.detail;
      //       this.svData.contract_no = this.contract_no;
      //       this.view.dismiss(this.svData);
      //     }
      //   }, (err) => {
      //     console.log(err);
      //   });


    } else {
      this.view.dismiss(data);
    }
  }
  close() {
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SwPage');
  }

}
