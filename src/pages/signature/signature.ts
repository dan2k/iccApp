import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
/**
 * Generated class for the SignaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.signaturePad.clear();
    // this.canvasResize();
    console.log('ionViewDidLoad SignaturePage');
  }
  //Other Functions

  drawCancel() {
    this.navCtrl.push('Tab3Page');
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.navCtrl.push('Tab3Page', { signatureImage: this.signatureImage });
  }

  drawClear() {
    this.signaturePad.clear();
  }
  undo() {
    let data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  // ngAfterViewInit() {
  //   this.signaturePad.clear();
  //   this.canvasResize();
  // }


}
