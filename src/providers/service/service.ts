import { MessageProvider } from './../message/message';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { url } from "../../config"
import 'rxjs/add/operator/map';


@Injectable()
export class ServiceProvider {

  constructor(public http: Http,public msg:MessageProvider) {
    console.log('Hello ServiceProvider Provider');
  }
  getJob(token: string, uid: string, cust_ptype?: any, cust_pcode?: any,uType?:any,scope?:any,pv?:any) {
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
          uType: uType,
          scope: scope,
          pv:pv
        }
      };
      //console.log(body);
      this.http.post(`${url}/getJob`, body, options)
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
  confirmClose(token: string, uid: string,msv_no:any,rate?:any) {
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
          msv_no: msv_no,
          rate:rate
        }
      };
      console.log(body);
      this.http.post(`${url}/confirmClose`, body, options)
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
  saveProblem(token: string, uid: string, cust_ptype: any, cust_pcode: any, msv_detail: string,msv_type:any) {
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
          msv_detail: msv_detail,
          msv_type:msv_type
        }
      };
      console.log(body);
      this.http.post(`${url}/saveProblem`, body, options)
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
