import { MessageProvider } from "./../providers/message/message";
import { Network } from "@ionic-native/network";
import { Component } from "@angular/core";
import { Platform, ModalController, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
import { AppVersion } from '@ionic-native/app-version';
import { AppUpdate } from '@ionic-native/app-update';
import { url } from '../config';
//import { CacheService } from "ionic-cache";

@Component({
  templateUrl: "app.html",
  providers: [Network, MessageProvider,AppVersion,AppUpdate]
})
export class MyApp {
  rootPage: any;
  isMenu = false;
  userDataArr: any;
  userData: any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    //cache:CacheService,
    public network: Network,
    public modalCtrl: ModalController,
    public app: App,
    public msg: MessageProvider,
    private appVersion: AppVersion,
    private appUpdate:AppUpdate,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Set TTL to 12h
     // cache.setDefaultTTL(1);

     // cache.setDefaultTTL(60 * 60 * 12);

     // Keep our cached results when device is offline!
      // cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      splashScreen.hide();
      const updateUrl = `${url}/update/update.xml`;
      this.appUpdate.checkAppUpdate(updateUrl)
        .then((s) => {
          console.log(s);
        })
        .catch(e => {
        console.log(e);
      });

      console.log('appname=', this.appVersion.getAppName());
      console.log('appversioncode=', this.appVersion.getVersionCode());
      console.log('appversionnumber=', this.appVersion.getVersionNumber());

      if (this.network.type == "none") {
        // if disconnect
        console.log("connect:=>error");
        this.rootPage = "NetworkPage";
      } else {
        // if connect
        console.log("connect:=>ok");
      }
     // let userData = localStorage.getItem("userData");
      this.userData = JSON.parse(localStorage.getItem("userData"));
      this.userDataArr = JSON.parse(localStorage.getItem("userDataArr"));
      if (this.userData) {
        this.isMenu = true;
        this.rootPage = HomePage;
      } else {
        this.rootPage = "LoginTypePage";
      }
    });
  }
  logout() {
    this.msg.confirm("คุณต้องการออกจากระบบหรือไม่", data => {
      localStorage.removeItem("userData");
      localStorage.removeItem("userDataArr");
      let nav = this.app.getRootNav();
      nav.setRoot("LoginTypePage");
    });
  }
  map() {
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }
  selectpage() {
    console.log('userDataArr==>',this.userDataArr)
    let modal = this.modalCtrl.create("SelectPlacePage", {
      data: this.userDataArr
    });
    modal.onDidDismiss(datax => {
      if (datax) {
        localStorage.setItem("userData", JSON.stringify(datax));
        let nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
    modal.present();
  }
}
