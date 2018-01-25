import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  PopoverController
} from "ionic-angular";
import { MessageProvider } from "../../providers/message/message";

/**
 * Generated class for the PmDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pm-detail",
  templateUrl: "pm-detail.html"
})
export class PmDetailPage {
  public pmContract: any;
  public pmData: any;
  public userData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public msg: MessageProvider,
    public popup: PopoverController
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.pmData = this.navParams.get("pmData");
    this.getContract();
  }
  close() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad PmDetailPage");
  }
  getContract() {
    let params = {
      svno: this.pmData.msv_no
    };
    this.msg.postApi01("v1/listPmContract", params).then(
      (data: any) => {
        if (data.status) {
          this.pmContract = data.data;
        } else {
          console.log(data.msg);
        }
      },
      err => {
        console.error(err);
      }
    );
  }
  openSmile(myEvent) {
    let pop = this.popup.create(
      "PopSmilePage",
      {} /*{ showBackdrop: true, enableBackdropDismiss: true }*/
    );
    pop.onDidDismiss((data: any) => {
      if (data) {
        let params = {
          user_id: this.userData.user_id,
          msv_no: this.pmData.msv_no,
          userData: this.userData,
          rate: data.rate
        };
        this.msg.postApi01("v1/confirmPm", params).then(
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
    pop.present({
      ev: myEvent
    });
  }
}
