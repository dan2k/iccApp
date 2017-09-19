import { url } from './../../config';
import { MessageProvider } from './../message/message';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class HwProvider {

  constructor(
    public http: Http,
    public msg: MessageProvider
  ) {
    console.log('Hello HwProvider Provider');
  }
  getWorktype(token: string, uid: string, cust_ptype?: any, cust_pcode?: any) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        data: {
          user_id: uid,
          cust_ptype: cust_ptype,
          cust_pcode: cust_pcode,
        }
      };
      //console.log(body);
      this.http.post(`${url}/getWorktype`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          this.msg.checkToken(data.msg);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }



  getEquipset(token: string, uid: string, cust_ptype?: any, cust_pcode?: any, work_type_id?:any) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        data: {
          user_id: uid,
          cust_ptype: cust_ptype,
          cust_pcode: cust_pcode,
          work_type_id:work_type_id
        }
      };
      //console.log(body);
      this.http.post(`${url}/getEquipset`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          this.msg.checkToken(data.msg);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
  listEquip(token: string, uid: string, cust_ptype?: any, cust_pcode?: any, work_type_id?:any,equip_set_id?:any) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        data: {
          user_id: uid,
          cust_ptype: cust_ptype,
          cust_pcode: cust_pcode,
          work_type_id: work_type_id,
          equip_set_id: equip_set_id
        }
      };
      //console.log(body);
      this.http.post(`${url}/listEquip`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          this.msg.checkToken(data.msg);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  listSymptom(token: string, uid: string, pno:string) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        data: {
          user_id: uid,
          pno:pno
        }
      };
      //console.log(body);
      this.http.post(`${url}/listSymptom`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          this.msg.checkToken(data.msg);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
  getProblemsub(token: string, uid: string, pno:string) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        data: {
          user_id: uid,
          pno:pno
        }
      };
      //console.log(body);
      this.http.post(`${url}/getProblemsub`, body, options)
        .map(res => {
          return res.json();
        })
        .subscribe(data => {
          this.msg.checkToken(data.msg);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

}
