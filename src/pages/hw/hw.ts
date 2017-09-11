import { HwProvider } from './../../providers/hw/hw';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the HwPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hw',
  templateUrl: 'hw.html',
  providers:[HwProvider]
})
export class HwPage {
  public token: any;
  public userData: any;
  public svData: any;
  public worktypes: any;
  public equipset: Array<any>=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public hw:HwProvider
  ) {
    this.token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.svData = this.navParams.get('svData');
    this.getWorktype();
    console.log(this.equipset);
  }
  getWorktype() {

    this.hw.getWorktype(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode)
      .then((data: any) => {
        if (data.status) {
          this.worktypes = data.data;
          for (let i = 0; i < this.worktypes.length;i++) {
            this.getEquipset(this.worktypes[i].work_type_id);
          }
        }
      }, (err) => {
        console.log(err);
      });
  }

  getEquipset(work_type_id: any) {
    this.hw.getEquipset(this.token, this.userData.user_id, this.svData.cust_ptype, this.svData.cust_pcode, work_type_id)
      .then((data: any) => {
        //console.log(data.data);
        this.equipset.push(data.data);
      }, (err) => {

      });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HwPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
