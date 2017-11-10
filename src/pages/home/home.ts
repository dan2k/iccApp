import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tab1: any;
  public tab2: any;
  public tab3: any;
  public tab4: any;
  public userData: any;
  constructor(public navCtrl: NavController,private app:App) {
    this.userData= JSON.parse(localStorage.getItem('userData'));
    let userType = this.userData.user_type;
    if (userType == 1) {//moi
      let jobid = this.userData.job_id;
      console.log('jobid=>' + jobid);
      if (jobid == 2 || jobid == 3 || jobid == 4) {// สำหรับข้าราชการตั้งแต่ ศจ.เป็นต้นไป
        this.tab1 = 'MainmoiPage';
      } else {// สำหรับข้าราชการ สน.ท ่job_id=1
        this.tab1 = 'MainPage';
      }
    } else {//cdg สำหรับพนักงาน login เข้าใช้งาน
      this.tab1 = 'MaincdgPage';
    }
    this.tab2 = 'Tab3Page';
    this.tab3 = 'Tab3Page';
  }
  logout() {
     localStorage.removeItem('userData');
     let nav = this.app.getRootNav();
     nav.setRoot('LoginTypePage');
  }

}
