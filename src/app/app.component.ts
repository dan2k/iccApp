import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { Platform,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
//test test test test
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
      let userData = localStorage.getItem('userData');
       if (userData) {
         this.rootPage = HomePage;
       } else {

         this.rootPage = 'LoginTypePage';

       }
    });
  }
}
//
