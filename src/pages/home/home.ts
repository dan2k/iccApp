import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private tab1: any;
  private tab2: any;
  private tab3: any;
  private tab4: any;
  constructor(public navCtrl: NavController,private app:App) {
    let userData:any = JSON.parse(localStorage.getItem('userData'));
    //console.log(userData.fname);
    let userType = userData.user_type;
    if (userType == 1) {//moi
      let jobid = userData.job_id;
      console.log('jobid=>' + jobid);
      if (jobid == 2 || jobid == 3 || jobid == 4) {
        this.tab1 = 'MainmoiPage';
      } else {
        this.tab1 = 'MainPage';
      }
    } else {// cdg
      this.tab1 = 'MaincdgPage';
    }
    this.tab2 = 'Tab3Page';
    this.tab3 = 'Tab3Page';
  }
  logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userData');
     let nav = this.app.getRootNav();
     nav.setRoot('LoginPage');
  }

}
