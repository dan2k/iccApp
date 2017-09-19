import { url } from './../../config';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MessageProvider } from '../message/message';
/*
  Generated class for the SwProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SwProvider {

  constructor(
    public http: Http,
    public msg: MessageProvider,

  ) {
    console.log('Hello SwProvider Provider');
  }
  genProblemgroup(token: string, uid: string) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        data: {
          user_id: uid
        }
      };
      //console.log(body);
      this.http.post(`${url}/genProblemgroup`, body, options)
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
  genProblemsub(token: string, uid: string, prob_gid: any) {
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
          prob_gid:prob_gid
        }
      };
      //console.log(body);
      this.http.post(`${url}/genProblemsub`, body, options)
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
  genProblemsub2(token: string, uid: string, problem_sub_id: any) {
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
          problem_sub_id:problem_sub_id
        }
      };
      //console.log(body);
      this.http.post(`${url}/genProblemsub2`, body, options)
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
