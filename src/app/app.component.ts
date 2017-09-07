import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html',
  providers:[Network]
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public network:Network) {
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
       if (token) {
         console.log(true);
         this.rootPage = HomePage;
       } else {
         console.log(false);
         this.rootPage = 'LoginPage';
       }
      //this.rootPage = HomePage;
    });
  }
}

