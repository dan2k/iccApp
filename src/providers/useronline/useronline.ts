import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
// for firebase angularfire2
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/throttleTime";

/*
  Generated class for the UseronlineProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UseronlineProvider {
  userId: String; //current user uid
  mouseEvents: Subscription;
  timer: Subscription;
  authState: any = null;
  timestamp: any;
  userData: any;
  userOnline: userOnline;
  constructor(
    public http: Http,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    console.log("Hello UseronlineProvider Provider");
    //this.userData = JSON.parse(localStorage.getItem("userData"));
    /*if (this.userData) {
      //มีการ login จาก app แล้ว
      this.userId = this.userData.user_id;
      this.updateOnConnect();
      this.updateOnDisconnect(); // <-- new line added
      this.updateOnIdle(); // <-- new line added
    }
    */
    /*this.afAuth.authState.subscribe(user => {// เอาไว้ login anonymouse
      //console.log('user==>', user);
      if (user) {
        this.userId = user.uid;
        this.updateOnConnect();
        this.updateOnDisconnect() // <-- new line added
        this.updateOnIdle()   // <-- new line added
        console.log('userid====>',this.userId);
      }
    });
    */
  }
  initUser(userData: any) {
    this.userData = userData;
    if (this.userData) {
      //มีการ login จาก app แล้ว
      this.userId = this.userData.user_id;
      console.log('userOnline->userId--->'+ this.userId);
      this.updateOnConnect();
      this.updateOnDisconnect(); // <-- new line added
      this.updateOnIdle(); // <-- new line added
    }
  }
  getFilteredList(item: any, property: string, key: string) {
    return item.filter(item => {
      return item[property] == key;
    });
  }
  private anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(() => console.log("successful login Anonymous"))
      .catch(error => console.log(error));
  }
  /// Helper to perform the update in Firebase
  private updateStatus(status: string) {
    if (!this.userId) return;
    this.timestamp = firebase.database.ServerValue.TIMESTAMP; // เก็บค่า timestamp
    let type = this.userData.user_type;
    let level = type == 1 ? this.userData.user_level : 99; //cdg ให้เป็น level=99
    this.userOnline = {
      //userid: this.userId,
      type: type,
      level: level,
      status: status,
      timestamp:this.timestamp
    };
    this.db.object(`users/` + this.userId).update(this.userOnline);
  }
  /// Updates status when connection to Firebase starts
  private updateOnConnect() {
    return this.db
      .object(".info/connected")
      .valueChanges()
      .subscribe(connected => {
        let status = connected ? "online" : "offline";
        this.updateStatus(status);
       // console.log(connected);
      });
  }
  /// Updates status when connection to Firebase ends
  private updateOnDisconnect() {
    this.timestamp = firebase.database.ServerValue.TIMESTAMP; // เก็บค่า timestamp
    firebase
      .database()
      .ref()
      .child(`users/${this.userId}`)
      .onDisconnect()
      .update({ status: "offline", timestamp: this.timestamp });
  }
  /// Listen for mouse events to update status
  private updateOnIdle() {
    this.mouseEvents = Observable.fromEvent(document, "mousemove")
      .throttleTime(2000)
      .subscribe(() => {
        this.updateStatus("online");
        this.resetTimer();
      });
  }
  /// Reset the timer
  private resetTimer() {
    if (this.timer) this.timer.unsubscribe();
    this.timer = Observable.timer(5000).subscribe(() => {
      this.updateStatus("away");
    });
  }
  signOut() {
    this.updateStatus('offline')
    this.mouseEvents.unsubscribe()
    this.timer.unsubscribe()
    //this.afAuth.auth.signOut();
  }
  listUsers() {
    return this.db.list("/users");
  }
  getOnline(type: any) {
    return this.db.list("users", ref => ref.orderByChild("type").equalTo(type));
  }
}
export interface userOnline {
  //userid: any;
  type: any;
  level: any;
  status: any;
  timestamp: any;
}
