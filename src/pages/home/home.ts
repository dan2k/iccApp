import { UseronlineProvider } from './../../providers/useronline/useronline';
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

//import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  //providers:[AppVersion]
})
export class HomePage {
  public tab1: any;
  public tab2: any;
  public tab3: any;
  public tab4: any;
  public tab5: any;
  public userData: any;
  public rootPage: any;
  public userType: any;
  public colorHeader: any;
  public onlineC: any;
  public onlineP: any;
  public onlineR: any;
  public onlineD: any;
  public onlineG: any;
  public onlineT: any;
  //public version: any;
  constructor(
    public navCtrl: NavController,
    public userOnline: UseronlineProvider,
    //public appVersion: AppVersion
  ) {
    // this.appVersion.getVersionNumber().then((v) => {
    //    this.version = v;
    // }).catch(e => {
    //   console.log(e);
    // });

    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.userType = this.userData.user_type;
    console.log("userType=>" + this.userType);
    let userType = this.userData.user_type;

    if (userType == 1) {
      //สำหรับลูกค้า แบ่งตาม level ซึ่งอยู่ใน cen_job.level จากเดิมใช้ cen_user.job_id
      //1=site
      //2=ศจ
      //3=ศภ
      //4=ส่วนกลาง
      this.colorHeader = 'warning';
      let level = this.userData.user_level;
      console.log("level=>" + level);
      this.tab5 = 'PmPage';
      if (level == 2 || level == 3 || level == 4) {
        // สำหรับข้าราชการตั้งแต่ ศจ.เป็นต้นไป
        this.tab2 = "MainmoiPage";
        //this.tab1 = "FollowupCustomerSelfPage"
        this.tab1 = "FollowupCustomerMapPage";
        this.tab3 = "FollowupCustomerTotalPage";


      } else {
        // สำหรับข้าราชการ สน.ท ่job_id=1
        this.tab1 = "FollowupCustomerSelfPage"
        this.tab2 = "MainPage";

      }
    } else {
      //cdg สำหรับพนักงาน login เข้าใช้งาน
      //this.tab1 = "MaincdgPage";
      this.colorHeader = 'ptitle';
      this.tab2 = "FollowCdgSelfPage";
      this.tab3 = "FollowCdgTotalPage";
    }
    //this.tab2 = 'Tab3Page';
    //this.tab3 = 'Tab3Page';


    this.userOnline.initUser(this.userData);
    //userOnline
    this.userOnline.getOnline('1').valueChanges().subscribe(item => {
      let tmp = this.userOnline.getFilteredList(item, 'status', 'online');
      let tm = this.userOnline.getFilteredList(tmp, 'level', '1');
      this.onlineD = tm.length;
      tm = this.userOnline.getFilteredList(tmp, 'level', '2');
      this.onlineP=tm.length
      tm = this.userOnline.getFilteredList(tmp, 'level', '3');
      this.onlineR=tm.length
      tm = this.userOnline.getFilteredList(tmp, 'level', '4');
      this.onlineC=tm.length
      this.userOnline.getOnline('2').valueChanges().subscribe(item => {
        let tmp = this.userOnline.getFilteredList(item, 'status', 'online');
        this.onlineG = tmp.length;
        this.onlineT = this.onlineC + this.onlineR + this.onlineP + this.onlineD + this.onlineG;
      });
    });
  }
  // logout() {
  //   this.msg.confirm('คุณต้องการออกจากระบบหรือไม่', (data) => {
  //     localStorage.removeItem('userData');
  //     let nav = this.app.getRootNav();
  //     nav.setRoot('LoginTypePage');
  //   });
  // }
  // setting() {
  //   this.navCtrl.push('SettingPage');
  // }
  tel(tel: any) {
    window.open('tel://' + tel);
  }
}

