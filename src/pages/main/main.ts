import { MessageProvider } from './../../providers/message/message';
import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App} from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [ServiceProvider,MessageProvider]
})
export class MainPage {
  public userData: any;
  public svData: any;
  public  token: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public serviceProvider: ServiceProvider,
    public app: App,
    public msg:MessageProvider

  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.token = localStorage.getItem('token');
    this.getJob();

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MainPage');
  //   this.getJob();
  // }
  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter MainPage')
  //   this.getJob();
  // }
  // ionViewCanEnter(){
  //  console.log('ionViewCanEnter MainPage')
  //   this.getJob();
  // }
  // ionViewDidEnter(){
  //  console.log('ionViewDidEnter MainPage')
  //   this.getJob();
  // }
  // ionViewDidLeave(){
  //  console.log('ionViewDidLeave MainPage')
  //   this.getJob();
  // }
  // ionViewWillUnload(){
  //  console.log('ionViewWillUnload MainPage')
  //   this.getJob();
  // }
  async getJob() {
    this.serviceProvider.getJob(this.token, this.userData.user_id, this.userData.cust_ptype, this.userData.cust_pcode,'','','')
      .then((data:any) => {
        if (data.status) {
          this.svData = data.data;
          console.log('xxxxxxxxxxx', this.svData);
        }else {
          console.log(data);
          let isExpired = /Expired token/g.test(data.msg);
          let isVerification = /Signature verification/g.test(data.msg);
          console.log(`isExpired=${isExpired},isVerification=${isVerification}`);
        }
      }, (err) => {
        console.log(err);
      });
  }

  showProblem(type: any) {
    let problem = this.modalCtrl.create('ModalProblemPage', { type: type });
    problem.onDidDismiss(() => {
      this.getJob();
    });
    problem.present();
  }
  openFollow(sv: any) {
    console.log('sv====>', sv);
     let follow = this.modalCtrl.create('FollowupProblemPage', { svData: sv });
       follow.onDidDismiss(() => {
         this.getJob();
         console.log('msg=>', 1);
       });
      follow.present();
  }

}
