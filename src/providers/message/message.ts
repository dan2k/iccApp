import { url } from './../../config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController, ModalController,App } from 'ionic-angular';
/*
  Generated class for the MessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessageProvider {

  constructor(
    public http: Http,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private app: App
  ) {
    console.log('Hello MessageProvider Provider');
  }
  load(msg: any) {
    let load=this.loadingCtrl.create({
      spinner: 'doted',
      content: `${msg}`
    });
    load.present();
    return load;
  }
  toast(msg) {
    let toast = this.toastCtrl.create({
      message: `${msg}`,
      duration: 3000
    });
    toast.present();
  }
  checkServer() {
    let load = this.load(`กำลังประมวลผลข้อมูล`);
    load.present();
    this.http.get(`${url}/isConnect`)
      .subscribe((data) => {
        load.dismiss();
        console.log(data);
      }, (err) => {
        load.dismiss();
        console.log('err----->',err);
        let merr = this.modalCtrl.create('NetworkPage');
        merr.onDidDismiss(() => {
          this.checkServer();
        });
        merr.present();
      });
  }
  checkToken(msg) {
    console.log('checkToken:', msg);
    let isExpired = /Expired token/g.test(msg);
    let isVerification = /Signature verification/g.test(msg);
    if (isExpired || isVerification) {
      if (isVerification) alert('Token Invalid Verification!');
      if (isExpired) alert('Token Expired!');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      let nav = this.app.getRootNav();
      nav.setRoot('LoginPage');
    }
  }

}
