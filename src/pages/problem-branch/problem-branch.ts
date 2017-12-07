import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';


/**
 * Generated class for the ProblemBranchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem-branch',
  templateUrl: 'problem-branch.html',
})
export class ProblemBranchPage {
  public svData: any;
  public userData: any;
  public msvno: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public msg: MessageProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
  ) {
    this.msvno = this.navParams.get('msvno');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.listBranch();
  }
  openFollow(sv: any) {
    let follow = this.modalCtrl.create("FollowupProblemPage", { svData: sv });
    follow.onDidDismiss(() => {
      this.listBranch();
      //console.log("msg=>", 1);
    });
    follow.present();
  }
  close() {
    this.viewCtrl.dismiss();
  }
  listBranch() {
    let params = {
      userData: this.userData,
      msvno: this.msvno,
    };
    this.msg.postApi01("v1/listBranch", params).then(
      (data: any) => {
        if (data.status) {
          this.svData = data.data;
          if (this.svData.length < 1) {
            this.close();
          }
        } else {
          alert(data.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProblemBranchPage');
  }

}
