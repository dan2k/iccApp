import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public tab1: any;
  public tab2: any;
  public tab3: any;
  public tab4: any;
  public userData: any;
  public rootPage: any;
  public userType: any;
  public colorHeader: any;
  constructor(public navCtrl: NavController) {

    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.userType = this.userData.user_type;
    console.log("userType=>" + this.userType);
    let userType = this.userData.user_type;

    if (userType == 1) {
      //สำหรับลูกค้า แบ่งตาม jobid
      //1=site
      //2=ศจ
      //3=ศภ
      //4=ส่วนกลาง
      this.colorHeader = 'warning';
      let jobid = this.userData.job_id;
      console.log("jobid=>" + jobid);
      if (jobid == 2 || jobid == 3 || jobid == 4) {
        // สำหรับข้าราชการตั้งแต่ ศจ.เป็นต้นไป
        this.tab1 = "MainmoiPage";
        this.tab2 = "FollowupCustomerSelfPage"
        this.tab3 = "FollowupCustomerTotalPage"

      } else {
        // สำหรับข้าราชการ สน.ท ่job_id=1
        this.tab1 = "MainPage";
        this.tab2 = "FollowupCustomerSelfPage"

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
}
