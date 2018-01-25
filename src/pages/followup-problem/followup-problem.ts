//import { ServiceProvider } from './../../providers/service/service';
//import { CommentProvider } from './../../providers/comment/comment';

import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  PopoverController
} from "ionic-angular";
import { url } from "../../config";
import { PhotoViewer } from "@ionic-native/photo-viewer";

//import { PopoverPage } from './followup-problem';
import { MessageProvider } from "../../providers/message/message";
/**
 * Generated class for the FollowupProblemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-followup-problem",
  templateUrl: "followup-problem.html",
  providers: [
    PhotoViewer
    //CommentProvider,
    // ServiceProvider
  ]
})
export class FollowupProblemPage {
  public svData: any;
  public imageData: any;
  public comments: any;
  public token: any;
  public userData: any;
  public xurl: any;
  public isRG: any;
  public isMoi: any;
  public isOpen: any;
  public imgHide: any = false;
  public kpid: any;
  public preno: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public modalController: ModalController,
    //public commentProvider: CommentProvider,
    public popup: PopoverController,
    // public serviceProvider: ServiceProvider,
    public msg: MessageProvider
  ) {
    //this.token = localStorage.getItem('token');
    this.xurl = url;
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.svData = this.navParams.get("svData");
    this.preno = this.svData.msv_no.substr(0, 1);
    console.log("preno==>",this.preno);
    console.log(this.userData);
    //let jobid = this.userData.job_id;
    let level = this.userData.user_level;
    if (level == 2 || level == 3 || level == 4) {
      //เอาไว้ตรวจสอบว่าเป็น สน.ท login หรือเปล่า ถ้าใช่ก็ ปิดตรงส่งจ๊อบไปก่อน
      this.isMoi = true;
      if (level == 2) {
        this.kpid = 2;
      }
      if (level == 3) {
        this.kpid = 3;
      }
    } else {
      this.isMoi = false;
    }
    console.log("isMoi=>" + this.isMoi);
    console.log("kpid=>", this.kpid);
    console.log("skpidx=>", this.svData.skp_idx);
    console.log("svData.msv_status=>", this.svData.msv_status);

    console.log("svDatax2=>", this.svData);

    let str = this.svData.msv_no.substr(0, 2);
    let msvno = "";
    //console.log('str=>' + str);
    if (str === "RG") {
      this.isRG = true;
      //console.log('1----1');
      msvno = this.svData.msv_no2;
    } else {
      this.isRG = false;
      //console.log('2----2');
      msvno = this.svData.msv_no;
    }
    //console.log(`imageData=>${msvno}`);

    if (
      this.svData.cust_ptype == this.userData.cust_ptype &&
      this.svData.cust_pcode == this.userData.cust_pcode &&
      this.svData.kp_idx == this.svData.skp_idx
    ) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
    this.imageData = `${url}/uploads/msv-pic/${msvno}.jpg`;
    //console.log(this.imageData);
    this.getComment();
    console.log("problem_type==>" + this.svData.msv_type);
    console.log("isRG==>" + this.isRG);
    // console.log('isOPen=' + this.isOpen)
    // console.log('svData.userData.cust_ptype=', this.userData.cust_ptype);
    // console.log('svData.userData.cust_pcode=', this.userData.cust_pcode);
    // console.log('svData.svData.cust_ptype=', this.svData.cust_ptype);
    // console.log('svData.svData.cust_pcode=', this.svData.cust_pcode);
    // console.log('svData.svData.msv_status=', this.svData.msv_status);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FollowupProblemPage");
  }
  async getComment() {
    let params = {
      userData: this.userData,
      msv_no: this.svData.msv_no
    };
    this.msg.postApi01("v1/getComment", params).then(
      (data: any) => {
        if (data.status) {
          this.comments = data.data;
          console.log("commentdata=>", this.comments);
        } else {
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  // async getComment() {
  //   this.commentProvider.getComment(this.token, this.userData.user_id, this.svData.msv_no)
  //     .then((data: any) => {
  //       if (data.status) {

  //         this.comments = data.data;
  //         console.log('commentdata=>', this.comments);
  //       } else {
  //         console.log(data);
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  showPhoto() {
    this.photoViewer.show(this.imageData);
  }
  showPhotox(img) {
    this.photoViewer.show(img);
  }
  close() {
    this.navCtrl.pop();
  }
  edit(sv: any) {
    let page: any;
    if (sv.msv_type == 1) {
      page = "HwPage";
    } else if (sv.msv_type == 2) {
      page = "SwPage";
    }
    let model = this.modalController.create(page, { svData: sv });
    model.onDidDismiss((data: any) => {
      console.log(data);
      if (data) {
        this.svData = data;
      }
    });
    model.present();
  }
  //delete job
  trash(sv) {
    this.msg.confirm(
      "คุณต้องการลบข้อมูลหรือไม่",
      sv => {
        let params = {
          userData: this.userData,
          sv_no: sv.msv_no
        };
        this.msg.postApi01("v1/deleteSv", params).then(
          (data: any) => {
            if (data.status) this.close();
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      },
      sv
    );
  }
  // //delete job
  // trash(sv) {
  //   console.log('xx');
  //   this.msg.confirm('คุณต้องการลบข้อมูลหรือไม่', (sv) => {
  //     let params = {
  //       user_id: this.userData.user_id,
  //       sv_no: sv.msv_no
  //     }
  //     this.msg.postApi(this.token, 'deleteSv', params)
  //       .then((data: any) => {
  //         if (data.status) this.close();
  //         console.log(data);
  //       }, (err) => {
  //         console.log(err);
  //       });
  //   },sv);
  // }

  openComment() {
    let model = this.modalController.create("CommentPage", {
      msv_no: this.svData.msv_no
    });
    model.onDidDismiss(() => {
      this.getComment();
      //console.log('msg=>', 1);
    });
    model.present();
  }
  openBranch(msvno) {
    let modal = this.modalController.create("ProblemBranchPage", { msvno: msvno });
    modal.onDidDismiss(() => {

    });
    modal.present();
  }
  returnJob() {
    //ส่งคืนกลับไปกรณีที่ยังไม่ได้รับการแก้ไขจริง ๆ
    let params = {
      user_id: this.userData.user_id,
      svno: this.svData.msv_no,
      userData: this.userData
    };
    this.msg.postApi01("v1/returnJob", params).then(
      (data: any) => {
        if (data.status) {
          //return ok
          console.log(data);
          this.close();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  // returnJob() {//ส่งคืนกลับไปกรณีที่ยังไม่ได้รับการแก้ไขจริง ๆ
  //   let params = {
  //     user_id: this.userData.user_id,
  //     svno: this.svData.msv_no,
  //     userData:this.userData
  //   }
  //   this.msg.postApi(this.token,'returnJob',params)
  //     .then((data: any) => {
  //       if (data.status) {
  //         //return ok
  //         console.log(data);
  //         this.close();
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  errorHandler(event) {
    this.imgHide = true;
    console.debug(event);
  }
  openFollow2(msvno: any) {
    //alert(this.svData.msv_no);
    let model = this.modalController.create("Followup2Page", { msv_no: msvno });
    model.onDidDismiss(() => {
      //console.log('msg=>', 1);
    });
    model.present();
  }
  openPop(myEvent) {
    // let pop = this.popup.create('PopSolvePage', {svData:this.svData}, { cssClass: 'custom-popover' }/*, {}, { showBackdrop: true, enableBackdropDismiss: false }*/);
    // pop.onDidDismiss((data: any) => {
    //   if (data) {
    //     // this.serviceProvider.close(this.token, this.userData.user_id, this.svData.msv_no,data.solve,this.userData)
    //     //   .then((data: any) => {
    //     //     console.log(data);
    //     //     this.close();
    //     //   }, (err) => {
    //     //     this.close();
    //     //     console.log(err);
    //     //   });
    //     let params = {
    //       user_id: this.userData.user_id,
    //       msv_no: this.svData.msv_no,
    //       solve: data.solve,
    //       userData:this.userData
    //     };
    //     this.msg.postApi01('v1/close',params)
    //     .then((data: any) => {
    //       console.log(data);
    //       this.close();
    //     }, (err) => {
    //       this.close();
    //       console.log(err);
    //     });
    //   }
    // });
    // pop.present({
    //   ev: myEvent
    // });
    let modal = this.modalController.create("PopSolvePage", {
      svData: this.svData
    });
    modal.onDidDismiss((data: any) => {
      if (data) {
        let params = {
          user_id: this.userData.user_id,
          msv_no: this.svData.msv_no,
          solve: data.solve,
          userData: this.userData
        };
        this.msg.postApi01("v1/close", params).then(
          (data: any) => {
            console.log(data);
            this.close();
          },
          err => {
            this.close();
            console.log(err);
          }
        );
      }
    });
    modal.present();
  }

  openSmile(myEvent) {
    if (this.isRG) {
      let pop = this.popup.create(
        "PopSmilePage",
        {} /*{ showBackdrop: true, enableBackdropDismiss: true }*/
      );
      pop.onDidDismiss((data: any) => {
        if (data.type == 1) {
          let params = {
            user_id: this.userData.user_id,
            msv_no: this.svData.msv_no,
            userData: this.userData,
            rate: data.rate
          };
          this.msg.postApi01("v1/confirmClose", params).then(
            (data: any) => {
              console.log(data);
              this.close();
            },
            err => {
              this.close();
              console.log(err);
            }
          );
          // this.serviceProvider.confirmClose(this.token, this.userData.user_id, this.svData.msv_no,this.userData, data.rate)
          //   .then((data: any) => {
          //     console.log(data);
          //     this.close();
          //   }, (err) => {
          //     this.close();
          //     console.log(err);
          //   });
        }
      });
      pop.present({
        ev: myEvent
      });
    } else {
      //close job moi no show popup smile
      let params = {
        user_id: this.userData.user_id,
        msv_no: this.svData.msv_no,
        userData: this.userData
      };
      this.msg.postApi01("v1/confirmClose", params).then(
        (data: any) => {
          console.log(data);
          this.close();
        },
        err => {
          this.close();
          console.log(err);
        }
      );
      // this.serviceProvider.confirmClose(this.token, this.userData.user_id, this.svData.msv_no,this.userData)
      //   .then((data: any) => {
      //     console.log(data);
      //     this.close();
      //   }, (err) => {
      //     this.close();
      //     console.log(err);
      //   });
    }
  }
  service(svData: any) {
    let modal = this.modalController.create('ServicePage', { svData: svData });
    modal.onDidDismiss(() => {
      //
      this.close();
    });
    modal.present();
  }
  sendback(svData: any) {
    let modal = this.modalController.create('SendbackPage', { svData: svData });
    modal.onDidDismiss(() => {
      //
      this.close();
    });
    modal.present();
  }
  openJob(svData: any) {
    //รับจ๊อบจาก ข้าราชการเพื่อทำการวิเคราะห์และทำการแตกจ๊อบใหม่
    //let status = svData.msv_status;
    //let page = status != 0 ? 'FollowupProblemPage' : 'JobDistributePage';
    let page = "JobDistributePage";
    let modal = this.modalController.create(page, { svData: svData });
    modal.onDidDismiss(() => {
      this.close();
    });
    modal.present();
  }
  tel(tel: any) {
    window.open('tel://' + tel);
  }
}
