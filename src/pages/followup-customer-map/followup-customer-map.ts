import { url } from "./../../config";
import { Component, ElementRef } from "@angular/core";
//import { Http} from '@angular/http';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import * as $ from "jquery";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
//import { CacheService } from "ionic-cache";

@IonicPage()
@Component({
  selector: "page-followup-customer-map",
  templateUrl: "followup-customer-map.html"
})
export class FollowupCustomerMapPage {
  userData: any;
  mapUrl: any;
  startUrl: any;
  url: SafeResourceUrl;
  first: any;
  showControls: boolean = true;
  scale: number = 1;
  html:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _elRef: ElementRef,
    public sanitizer: DomSanitizer,
    //public cache: CacheService,
    public modalCtrl: ModalController,
    //public http:Http,
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    //this.html = this.http.get('http://43.228.82.23/webrg6/iccServer/map/map.html').map(response => response.text()).subscribe(html => this.html = html);
    console.log(this.html);
    let rcode: any;
    switch (this.userData.job_id) {
      case "1":
        this.startUrl = "";
        break;
      case "2":
        this.startUrl = `province.php`;
        rcode = this.userData.cc;
        this.first = "P";
        break;
      case "3":
        this.startUrl = `region.php`;
        rcode = this.userData.section_id;
        this.first = "R";
        break;
      case "4":
        this.startUrl = "center.php";
        this.first = "C";
        break;
    }
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${url}/map/${this.startUrl}?sur_type_id=${this.userData
        .sur_type_id}&rcode=${rcode}&first=${this.first}`
    );
    console.log(this.mapUrl);
  }
  ionViewDidEnter() {
    this.loadIframe();
  }
  loadIframe() {
    let obj = this;
    let myFrame = $(this._elRef.nativeElement).find("#myFrame");

    //$(this._elRef.nativeElement).find("#myFrame").prop('src', this.mapUrl);
    $(this._elRef.nativeElement)
      .find("#myFrame")
      .on("load", function () {
        let $iframe: any = $("#myFrame").contents();
        //$iframe.find('body').css({zoom:'50%'});
        let level: any = $iframe.find("body #Map2").attr("level");
        let area: any = $iframe.find("body #Map2 area");
        area.each(function(i) {
          $(this).on("click", function(i) {
            let href = $(this).prop("href");
            let rcode: any = href.split("=");
            $(this).removeAttr("href");
            $(this).attr("rcode", rcode[1]);
          });
        });
        area.each(function(i) {
          $(this).on("click", function (i) {
            window.applicationCache.UNCACHED;
            let total: any = $(this).data("total");
            obj.show($(this).attr("rcode"), myFrame, level, total);
          });
        });
      });
  }
  show(rcode: any, obj: any, level: any, total: any) {
    //alert(level);
    if (total < 1) {
      // alert('ไม่มีข้อมูลปัญหา');
      //return false;
    }
    if (level == "dcs") {
      let data = { surTypeid: this.userData.sur_type_id, rcode: rcode };
      let modal = this.modalCtrl.create("FollowupCustomerMapListPage", {
        data: data
      });
      /*modal.onDidDismiss(() => {
        this.loadIframe();
      });*/
      modal.present();
    } else {
      let urlx = `${url}/map/${level}?sur_type_id=${this.userData
        .sur_type_id}&rcode=${rcode}&first=${this.first}`;
      obj.attr("src", urlx);
    }
  }
  afterZoomIn(event) {
    console.log("After ZoomIn Event: ", event);
  }

  afterZoomOut(event) {
    console.log("After ZoomOut Event: ", event);
  }
}
