//import { ServiceProvider } from "./../../providers/service/service";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera } from "@ionic-native/camera";
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { url } from "../../config";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { MessageProvider } from "./../../providers/message/message";
/**
 * Generated class for the ModalProblemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-problem",
  templateUrl: "modal-problem.html",
  providers: [
    //ServiceProvider,
    FileTransfer,
    Camera,
    PhotoViewer,
    MessageProvider
  ]
})
export class ModalProblemPage {
  public ptype: any;
  public detail: string = "";
  public token: string;
  public userData: any;
  public imageData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    //public serviceProvider: ServiceProvider,
    private transfer: FileTransfer,
    private camera: Camera,
    private photoViewer: PhotoViewer,
    private msg: MessageProvider
  ) {
    this.ptype = this.navParams.get("type");
    this.token = localStorage.getItem("token");
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalProblemPage");
  }
  close() {
    this.viewController.dismiss();
  }
  saveProblem() {
    let load = this.msg.load("กำลังประมวลผล");
    let isImg = this.imageData ? true : false;
    let params = {
      user_id: this.userData.user_id,
      cust_ptype: this.userData.cust_ptype,
      cust_pcode: this.userData.cust_pcode,
      msv_detail: this.detail,
      msv_type:this.ptype,
      userData: this.userData
    };
    this.msg.postApi01("v1/saveProblem", params).then(
      (data: any) => {
        load.dismiss();
        if (data.status) {
          console.log(data);
          if (isImg) {
            this.upload(data.msv_no);
          } else {
            this.close();
          }
        } else {
          console.log(data.msg);
        }
      },
      err => {
        load.dismiss();
        this.msg.toast(err);
        console.log(err);
      }
    );
  }
  // saveProblem() {
  //   let load=this.msg.load('กำลังประมวลผล');
  //   let isImg = this.imageData ? true : false;
  //   this.serviceProvider.saveProblem(
  //     this.token,
  //     this.userData.user_id,
  //     this.userData.cust_ptype,
  //     this.userData.cust_pcode,
  //     this.detail,
  //     this.ptype,
  //     this.userData
  //   ).then((data: any) => {
  //     load.dismiss();
  //     if (data.status) {
  //       console.log(data);
  //       if (isImg) {
  //         this.upload(data.msv_no);
  //       } else {
  //         this.close();
  //       }
  //     } else {
  //       console.log(data);
  //     }
  //     }, (err) => {
  //       load.dismiss();
  //       this.msg.toast(err);
  //     console.log(err);
  //   });
  // }
  takePicture() {
    let options = {
      quality: 30
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.imageData = imageData;
      })
      .catch(err => {
        console.log(err);
      });
  }
  upload(msvno: string) {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let load = this.msg.load("กำลัง upload รูปภาพ");
    const fileTransfer: FileTransferObject = this.transfer.create();
    var options = {
      fileKey: "file",
      fileName: `${msvno}.jpg`,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { fileName: `${msvno}.jpg` },
      httpMethod: "POST"
    };
    fileTransfer.upload(this.imageData, `${url}/upload`, options).then(
      data => {
        this.msg.toast("upload photo to server complete!");
        load.dismiss();
        // success

        console.log(data);
        this.close();
      },
      err => {
        // error
        this.msg.toast("Can not to upload photo to server !");
        load.dismiss();
        console.log("error:=>", JSON.stringify(err));
        this.close();
      }
    );
  }
  removePicture() {
    this.imageData = null;
  }
  showPhoto() {
    this.photoViewer.show(this.imageData);
  }
}
