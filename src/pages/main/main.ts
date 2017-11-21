import { MessageProvider } from './../../providers/message/message';
//import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
//import { url } from './../../config';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

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
 // providers: [ServiceProvider,MessageProvider]
})
export class MainPage {
  public userData: any;
  public svData: any;
  public token: string;
  public colorHeader = 'warning';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    //public serviceProvider: ServiceProvider,
    public app: App,
    public msg:MessageProvider
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    //this.getJob();
  }

  // async getJob() {
  //   let params = {
  //     userData: this.userData,
  //     cust_ptype: this.userData.cust_ptype,
  //     cust_pcode: this.userData.cust_pcode,
  //     uType: '',
  //     scope: '',
  //     pv:'',
  //   };
  //   this.msg.postApi01(`v1/getJob`,params)
  //     .then((data:any) => {
  //       if (data.status) {
  //         this.svData = data.data;
  //       }else {
  //         alert(data.msg);
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

  showProblem(type: any) {
    let problem = this.modalCtrl.create('ModalProblemPage', { type: type });
    problem.onDidDismiss(() => {
      //this.getJob();
    });
    problem.present();
  }
  // openFollow(sv: any) {
  //   console.log('sv====>', sv);
  //    let follow = this.modalCtrl.create('FollowupProblemPage', { svData: sv });
  //      follow.onDidDismiss(() => {
  //        this.getJob();
  //        console.log('msg=>', 1);
  //      });
  //     follow.present();
  // }
}
