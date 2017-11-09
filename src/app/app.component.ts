import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { Platform,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';




@Component({
  templateUrl: 'app.html',
  providers:[Network]
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public network:Network,public modalCtrl:ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (this.network.type == 'none') {// if disconnect
        console.log('connect:=>error');
        this.rootPage = "NetworkPage";
      } else {// if connect
        console.log('connect:=>ok');
      }

      let token = localStorage.getItem('token');
      let userData = localStorage.getItem('userData');

      //  if (token) {
      //    console.log(true);
      //    this.rootPage = HomePage;
      //  } else {
      //    console.log(false);
      //    this.rootPage = 'LoginPage';
      //  }
       if (userData) {
         //console.log(true);
         this.rootPage = HomePage;
       } else {
         //console.log(false);
         this.rootPage = 'LoginTypePage';
         /* let modal = this.modalCtrl.create(LoginTypePage);
         modal.onDidDismiss((data:any) => {
           console.log('xxxxxxxxxxxxxxxxx');
         });
         modal.present(); */
       }
      //this.rootPage = HomePage;
    });
  }
}

