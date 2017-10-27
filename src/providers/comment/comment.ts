import { MessageProvider } from './../message/message';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from "../../config"


@Injectable()
export class CommentProvider {
  constructor(public http: Http,public msg:MessageProvider) {
    console.log('Hello CommentProvider Provider');
  }
  saveComment(token: string, uid: string, msv_no: any, detail: string,user_type:any,userData:any) {
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
          msv_no:msv_no,
          comment_detail: detail,
          user_type: user_type,
          userData:userData
        }
      };
      console.log('comment', body);
      this.http.post(`${url}/saveComment`, body, options)
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
  getComment(token: string, uid: string, msv_no: string) {
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
          msv_no:msv_no
        }
      };
      console.log('getComment:=>',body);
      this.http.post(`${url}/getComment`, body, options)
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
  getSvdata(token: string, uid: string, msv_no: string) {
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
          msv_no:msv_no
        }
      };
      console.log('getSvdata:=>',body);
      this.http.post(`${url}/getSvdata`, body, options)
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
