import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { MessageProvider } from "../../providers/message/message";

/**
 * Generated class for the FollowupCustomerSelfPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-followup-customer-self",
  templateUrl: "followup-customer-self.html"
})
export class FollowupCustomerSelfPage {
  items = [];
  userData: any;
  total: any;
  isData: any = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public modalCtrl: ModalController
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }
  getColor(status: any) {
    return this.msg.getStatusColor(status);
  }
  getJob() {
    this.items = [];
    let lastRow = 0;
    console.log("length------------>", lastRow);
    let params = {
      userData: this.userData,
      lastRow: 0
    };

    this.msg.postApi01(`v1/getJobCustomerSelf`, params).then(
      (data: any) => {
        if (data.status) {
          let datax = data.data;
          let total = data.data.length;
          this.total = data.total;
          let j = 0;
          for (let i = 0; i < total; i++) {
            this.items.push(datax[j]);
            j++;
          }
          if (this.items.length < 1) {
            this.isData = false;
          }
          console.log("x1", this.items);
        } else {
          alert(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  doInfinite(infiniteScroll) {
    let lastRow = this.items.length;
    if (this.total == lastRow) {
      infiniteScroll.complete();
      return false;
    }
    let params = {
      userData: this.userData,
      lastRow: lastRow
    };
    this.msg.postApi01(`v1/getJobCustomerSelf`, params).then(
      (data: any) => {
        if (data.status) {
          let datax = data.data;
          let total = datax.length;
          console.log(this.items);
          // console.log('total=>' + total);
          // console.log('item-before',this.items);
          console.log("datax-load", datax);
          for (let i = 0; i < total; i++) {
            this.items.push(datax[i]);
          }
          console.log("item-before", this.items);
          infiniteScroll.complete();
        } else {
          alert(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  openFollow(sv: any) {
    console.log("sv====>", sv);
    let follow = this.modalCtrl.create("FollowupProblemPage", { svData: sv });
    follow.onDidDismiss(() => {
      //this.items = [];
      this.getJob();
      //console.log("msg=>", 1);
    });
    follow.present();
  }
  ionViewDidEnter() {
    console.log('ViewDidEnter FollowupCustomerSelfPage');
    //this.items = [];
    this.getJob();
  }
  // ionViewCanEnter(){
  //   console.log('ViewCanEnter FollowupCustomerSelfPage');
  // }
  // ionViewWillEnter(){
  //   console.log('ViewWillEnter FollowupCustomerSelfPage');
  // }

  // ionViewDidLoad() {
  //   console.log("ionViewDidLoad FollowupCustomerSelfPage");
  // }
}
