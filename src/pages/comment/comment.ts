import { MessageProvider } from './../../providers/message/message';
import { url } from './../../config';
import { CommentProvider } from './../../providers/comment/comment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera } from '@ionic-native/camera';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the CommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers: [FileTransfer,Camera,PhotoViewer,CommentProvider,MessageProvider]
})
export class CommentPage {
  private token: string;
  private userData: any;
  private imageData: any;
  private msv_no: any;
  private detail: any='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    private photoViewer: PhotoViewer,
    private commentProvider: CommentProvider,
    private msg:MessageProvider

  ) {
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.msv_no = this.navParams.get('msv_no');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  saveComment() {
    let load=this.msg.load('กำลังประมวลผล');
    let isImg = this.imageData ? true : false;
    this.commentProvider.saveComment(
      this.token,
      this.userData.user_id,
      this.msv_no,
      this.detail,
      this.userData.user_type,
      this.userData
    ).then((data: any) => {
      load.dismiss();
      console.log('--------------',this.userData);
      if (data.status) {
          this.msg.toast('บันทึกความคิดเห็นเรียบร้อยแล้ว')
          console.log(data, 'isImg:=>', isImg);
          if (isImg) {//have upload photo
            this.upload(data.sv_no,data.comment_no,data.pno);
          } else {
            this.close();
          }
      } else {
        this.msg.toast(data);
          console.log(data);
        }
      }, (err) => {
        load.dismiss();
        this.msg.toast(err);

      console.log(err);
    });
  }
  close() {
    this.navCtrl.pop();
  }
  takePicture() {
    let options = {
      quality: 30
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
    }).catch((err) => {
      console.log(err);
    });
  }
  upload(svno: string,comment_no:string,pno:string) {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let load = this.msg.load('กำลัง upload รูปภาพ');
    const fileTransfer: FileTransferObject = this.transfer.create();
    var options = {
      fileKey: "file",
      fileName: `${svno}-${pno}.jpg`,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': `${svno}.jpg`,'sv_no':svno,'comment_no':comment_no },
      httpMethod: 'POST'
    };
    fileTransfer.upload(this.imageData, `${url}/uploadComment`, options)
      .then((data) => {
        this.msg.toast('upload photo to server complete!');
        load.dismiss();
        // success

        console.log(data);
        this.close();
      }, (err) => {
        // error
        this.msg.toast('Can not to upload photo to server !');
        load.dismiss();
        console.log("error:=>", JSON.stringify(err));
        this.close();
      });


  }
  removePicture() {
    this.imageData = null;
  }
  showPhoto() {
    this.photoViewer.show(this.imageData);
  }

}
