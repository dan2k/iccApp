import { MessageProvider } from "./../providers/message/message";
import { Network } from "@ionic-native/network";
import { Component } from "@angular/core";
import { Platform, ModalController, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
@Component({
  templateUrl: "app.html",
  providers: [Network, MessageProvider]
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
    public network: Network,
    public modalCtrl: ModalController,
    public app: App,
    public msg: MessageProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

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
      let nav = this.app.getRootNav();
      nav.setRoot("LoginTypePage");
    });
  }
  selectpage() {
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
