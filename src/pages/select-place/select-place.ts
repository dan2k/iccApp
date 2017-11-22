import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-select-place",
  templateUrl: "select-place.html"
})
export class SelectPlacePage {
  data: any;
  place: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController
  ) {
    this.data = this.navParams.get("data");
  }
  close() {
    this.navCtrl.pop();
  }
  confirm(d) {
    //this.view.dismiss(this.place);
    this.view.dismiss(d);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SelectPlacePage");
  }
}
