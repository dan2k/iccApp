//import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pop-smile',
  templateUrl: 'pop-smile.html',
  //providers:[ServiceProvider]
})
export class PopSmilePage {
  private rate: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    //public serviceProvider: ServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopSmilePage');
  }
  close() {
    let data: any = {
      type: 1,
      rate:this.rate
    };
    this.viewCtrl.dismiss(data);
  }
}
