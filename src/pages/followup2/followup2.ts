import { MessageProvider } from './../../providers/message/message';
//import { CommentProvider } from './../../providers/comment/comment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { url } from "../../config";
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-followup2',
  templateUrl: 'followup2.html',
  providers:[PhotoViewer]
})
export class Followup2Page {
  public svData: any;
  public imageData: any;
  public comments: any;
  public token: any;
  public userData: any;
  public xurl: any;
  public isRG: any;

   constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public commentProvider: CommentProvider,
    public photoViewer: PhotoViewer,
    public msg:MessageProvider
    ) {
      this.token = localStorage.getItem('token');
      this.xurl = url;
      this.userData = JSON.parse(localStorage.getItem('userData'));


      let svno = this.navParams.get('msv_no');
      let params = {
        userData: this.userData,
        svno:svno
      };
      this.msg.postApi01('v1/getSvdata',params)
        .then((data: any) => {
          if (data.status) {
            console.log('xyz====>',data.data[0]);
            this.svData = data.data[0];
          this.imageData = `${url}/uploads/msv-pic/${this.svData.msv_no}.jpg`;
          this.getComment();
        } else {
          console.log(data);
        }
      }, (err) => {
        console.log(err);
      });
      // this.commentProvider.getSvdata(this.token, this.userData.user_id, svno)
      //   .then((data: any) => {
      //     if (data.status) {
      //       console.log('xyz====>',data.data[0]);
      //       this.svData = data.data[0];
      //     this.imageData = `${url}/uploads/msv-pic/${this.svData.msv_no}.jpg`;
      //     this.getComment();
      //   } else {
      //     console.log(data);
      //   }
      // }, (err) => {
      //   console.log(err);
      // });
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
  async getComment() {
    let params = {
      userData:this.userData,
      msv_no:this.svData.msv_no
    }
    this.msg.postApi01('v1/getComment',params)
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad Followup2Page');
  }
  errorHandler(event) {
    console.debug(event);
  }
  close() {
    this.navCtrl.pop();
  }
  showPhoto() {
    this.photoViewer.show(this.imageData);
  }
  showPhotox(img) {
    this.photoViewer.show(img);
  }
}
