import { ServiceProvider } from './../../providers/service/service';
import { CommentProvider } from './../../providers/comment/comment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { url } from "../../config";
import { PhotoViewer } from '@ionic-native/photo-viewer';

//import { PopoverPage } from './followup-problem';
import { MessageProvider } from '../../providers/message/message';
/**
 * Generated class for the FollowupProblemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followup-problem',
  templateUrl: 'followup-problem.html',
  providers: [PhotoViewer, CommentProvider, ServiceProvider],

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public modalController: ModalController,
    public commentProvider: CommentProvider,
    public popup: PopoverController,
    public serviceProvider: ServiceProvider,
    public msg:MessageProvider,
  ) {
    this.token = localStorage.getItem('token');
    this.xurl = url;
    this.userData = JSON.parse(localStorage.getItem('userData'));
    let jobid = this.userData.job_id;
    if (jobid == 2 || jobid == 3 || jobid == 4) {//เอาไว้ตรวจสอบว่าเป็น สน.ท login หรือเปล่า ถ้าใช่ก็ ปิดตรงส่งจ๊อบไปก่อน
      this.isMoi = true;
    } else {
      this.isMoi = false;
    }
    //console.log('isMoi=>' + this.isMoi,this.userData);

    this.svData = this.navParams.get('svData');
    console.log('svDatax2=>', this.svData);

    let str = this.svData.msv_no.substr(0, 2);
    let msvno = '';
    //console.log('str=>' + str);
    if (str === 'RG') {
      this.isRG = true;
      //console.log('1----1');
      msvno = this.svData.msv_no2;
    } else {
      this.isRG = false;
      //console.log('2----2');
      msvno = this.svData.msv_no;
    }
    //console.log(`imageData=>${msvno}`);

    if ((this.svData.cust_ptype == this.userData.cust_ptype) && (this.svData.cust_pcode == this.userData.cust_pcode) && (this.svData.kp_idx == this.svData.skp_idx)) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
    this.imageData = `${url}/uploads/msv-pic/${msvno}.jpg`;
    this.getComment();
    console.log('problem_type==>' + this.svData.msv_type);
    console.log('isRG==>' + this.isRG);
    // console.log('isOPen=' + this.isOpen)
    // console.log('svData.userData.cust_ptype=', this.userData.cust_ptype);
    // console.log('svData.userData.cust_pcode=', this.userData.cust_pcode);
    // console.log('svData.svData.cust_ptype=', this.svData.cust_ptype);
    // console.log('svData.svData.cust_pcode=', this.svData.cust_pcode);
    // console.log('svData.svData.msv_status=', this.svData.msv_status);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowupProblemPage');
  }
  async getComment() {
    this.commentProvider.getComment(this.token, this.userData.user_id, this.svData.msv_no)
      .then((data: any) => {
        if (data.status) {

          this.comments = data.data;
          console.log('commentdata=>', this.comments);
        } else {
          console.log(data);
        }
      }, (err) => {
        console.log(err);
      });
  }
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
      page = 'HwPage';
    } else if (sv.msv_type == 2) {
      page = 'SwPage';
    }
    let model = this.modalController.create(page, { svData:sv });
    model.onDidDismiss(() => {
      this.close();
    });
    model.present();
  }
  openComment() {
    let model = this.modalController.create('CommentPage', { msv_no: this.svData.msv_no });
    model.onDidDismiss(() => {
      this.getComment();
      //console.log('msg=>', 1);
    });
    model.present();
  }
  returnJob() {//ส่งคืนกลับไปกรณีที่ยังไม่ได้รับการแก้ไขจริง ๆ
    let params = {
      user_id: this.userData.user_id,
      svno: this.svData.msv_no
    }
    this.msg.postApi(this.token,'returnJob',params)
      .then((data: any) => {
        if (data.status) {
          //return ok
          console.log(data);
          this.close();
        }
      }, (err) => {
        console.log(err);
      });
  }
  errorHandler(event) {
    console.debug(event);
  }
  openFollow2(msvno: any) {
    //alert(this.svData.msv_no);
    let model = this.modalController.create('Followup2Page', { msv_no: msvno });
    model.onDidDismiss(() => {
      //console.log('msg=>', 1);
    });
    model.present();
  }
  openPop(myEvent) {
    let pop = this.popup.create('PopSolvePage', {}, { cssClass: 'custom-popover' }/*, {}, { showBackdrop: true, enableBackdropDismiss: false }*/);
    pop.onDidDismiss((data: any) => {
      if (data) {
        this.serviceProvider.close(this.token, this.userData.user_id, this.svData.msv_no,data.solve)
          .then((data: any) => {
            console.log(data);
            this.close();
          }, (err) => {
            this.close();
            console.log(err);
          });
      }
    });
    pop.present({
      ev: myEvent
    });
  }

  openSmile(myEvent) {
    if (this.isRG) {
      let pop = this.popup.create('PopSmilePage', {}/*{ showBackdrop: true, enableBackdropDismiss: true }*/);
      pop.onDidDismiss((data: any) => {
        if (data.type == 1) {
          this.serviceProvider.confirmClose(this.token, this.userData.user_id, this.svData.msv_no, data.rate)
            .then((data: any) => {
              console.log(data);
              this.close();
            }, (err) => {
              this.close();
              console.log(err);
            });
        }
      });
      pop.present({
        ev: myEvent
      });
    } else {
      //close job moi no show popup smile
      this.serviceProvider.confirmClose(this.token, this.userData.user_id, this.svData.msv_no)
        .then((data: any) => {
          console.log(data);
          this.close();
        }, (err) => {
          this.close();
          console.log(err);
        });

    }
  }

  openJob(svData: any) {
        //รับจ๊อบจาก ข้าราชการเพื่อทำการวิเคราะห์และทำการแตกจ๊อบใหม่
        //let status = svData.msv_status;
        //let page = status != 0 ? 'FollowupProblemPage' : 'JobDistributePage';
        let page = 'JobDistributePage';
        let modal = this.modalController.create(page, { svData: svData });
        modal.onDidDismiss(() => {
          this.close();
        });
        modal.present();
  }
}
