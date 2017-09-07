import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from "../../config";
/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: Http) {
    console.log('Hello RegisterProvider Provider');
  }
  genPtype(uType?: any, scope?: any, pv?: any) {
    pv = pv == '' ? null : pv;
    scope = scope == '' ? null : scope;
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      // let body = { 'uid': uid};
      this.http.get(`${url}/genPtype/${uType}/${scope}/${pv}`, options)
        //this.http.get(`http://localhost/sutin/book.php`)
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
  genPcode(uType?: any, scope?: any, pv?: any,custptype?:any) {
    pv = pv == '' ? null : pv;
    scope = scope == '' ? null : scope;
    custptype = custptype == '' ? null : custptype;
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.get(`${url}/genPcode/${uType}/${scope}/${pv}/${custptype}`, options)
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
  genProvince(uType?:any,scope?:any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'uid': 1,
        'uType': uType,
        'scope':scope
      };
      this.http.post(`${url}/genProvince`, body, options)
        //this.http.get(`http://localhost/sutin/book.php`)
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
  ckRegist(data: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { 'data': data };
      this.http.post(`${url}/listRegist`, body, options)
        //this.http.get(`http://localhost/sutin/book.php`)
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
  updaePwd(data: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { 'data': data };
      this.http.post(`${url}/updatePwd`, body, options)
        //this.http.get(`http://localhost/sutin/book.php`)
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
