import { url } from './../../config';
import { Component, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as $ from "jquery";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CacheService } from 'ionic-cache';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  userData: any;
  mapUrl: any;
  startUrl: any;
  url: SafeResourceUrl;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _elRef: ElementRef,
    public sanitizer: DomSanitizer,
    public cache:CacheService,
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
    let job_id = this.userData.job_id;
    job_id = 4;
    switch (job_id) {
      case 1: this.startUrl = ''; break;
      case 2: this.startUrl = `province.php`; break;
      case 3: this.startUrl = `region.php`; break;
      case 4: this.startUrl = 'center.php'; break;
    }
    //this.mapUrl=`${url}/map/${this.startUrl}?sur_type_id=${this.userData.sur_type_id}`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}/map/${this.startUrl}?sur_type_id=${this.userData.sur_type_id}`);
    // this.mapUrl = 'http://43.228.82.23/webrg6/iccServer/map/center.php?sur_type_id=1';
  }

  show1() {
    alert("xxxxxx");
    $("#x").text("white");
  }
  show(rcode: any, obj: any,level:any) {
    //alert(rcode);
    let urlx = `${url}/map/${level}?sur_type_id=${this.userData.sur_type_id}&rcode=${rcode}`

    obj.attr('src', urlx);

    //this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}/map/${this.startUrl}?sur_type_id=${this.userData.sur_type_id}&rg=${rcode}`);


  }
  ionViewDidLoad() {
    let obj = this;
    let myFrame = $(this._elRef.nativeElement).find("#myFrame");
    //$(this._elRef.nativeElement).find("#myFrame").prop('src', this.mapUrl);
    $(this._elRef.nativeElement)
      .find("#myFrame")
      .on("load", function () {
        obj.cache.clearAll();

        let $iframe: any = $("#myFrame").contents();
        let level: any = $iframe.find("body #Map2").attr("level");
        let area: any = $iframe.find("body #Map2 area");
        area.each(function (i) {
          $(this).on('click', function (i) {
            let href = $(this).prop('href');
            let rcode: any = href.split('=');
            $(this).removeAttr('href');
            $(this).attr('rcode', rcode[1]);
          });
        });
        area.each(function (i) {
          $(this).on('click', function (i) {
            obj.show($(this).attr('rcode'), myFrame, level);
          });
        });
      },);
  }
}
