import { MessageProvider } from './../message/message';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { url } from '../../config';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http,public msg:MessageProvider) {
    console.log('Hello UserProvider Provider');
  }
  login(tel: string, password: string,loginType:any) {
    this.msg.checkServer();
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { 'tel': tel, 'password': password,'loginType':loginType };
      this.http.post(`${url}/login`, body, options)
        //this.http.get(`http://localhost/sutin/book.php`)
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
