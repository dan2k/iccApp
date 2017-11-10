import { url } from './../../config';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController, ModalController,App,AlertController } from 'ionic-angular';
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
    private altCtrl:AlertController,
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
  alert(msg) {
    let alert = this.altCtrl.create({
      title: 'แจ้งเตือน',
      subTitle: `${msg}`,
      buttons: ['ตกลง']
    });
    alert.present();
  }
  confirm(msg:string,handler:any,data?:any) {
    let confirm = this.altCtrl.create({
      title: 'Confirm',
      message: msg,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            handler(data);
          }
        }
      ]
    });
    confirm.present();
  }
  checkServer() {
    let load = this.load(`กำลังประมวลผลข้อมูล`);
    load.present();
    this.http.get(`${url}/isConnect`)
      .subscribe((data) => {
        load.dismiss();
        console.log('isconnect process-->',data);
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
  postApi(token: string, endPoint:any,params?:any) {
    this.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
           data: params
       };
      //console.log(body);
      this.http.post(`${url}/${endPoint}`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          this.checkToken(data.msg);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
  postApi01(endPoint:any,params?:any) {
    this.checkServer();
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
           data: params
       };
      this.http.post(`${url}/${endPoint}`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
}
