import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable} from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 // @ViewChild("audio") audio;
  isOrder: number;
  availableMsg: string;
  available: any;
  sid: any;
  shop_name: any;
  mobile: any;
  brand: any;
  address: any;
  lat: any;
  lng: any;
  status: any;
  id: any;
  osid: any;
  ouid: any;
  ouname: any;
  oumobile: any;
  ouaddress: any;
  oubrand: any;
  ouweight: any;
  ogasprice: any;
  otransport: any;
  ohfee: any;
  ototal: any;
  ostatus: any;
  OStatus: any;
  interval: any;
  oid: any;
  olat: any;
  olng: any;
  ostatusNew: any;
  avbToggle: any;

  coid: any;
  intChk: any;
  odistance: any;


  constructor(private backgroundMode: BackgroundMode,private menuCtrl:MenuController,private router: Router,public toastController: ToastController,private http: HttpClient,private storage: Storage) {



    
}

ionViewWillEnter() {
  this.backgroundMode.enable();
  this.menuCtrl.enable(true);
}

ionViewDidLeave(){

}


  ngOnInit() {

    this.isOrder = 1;

    this.OStatus = 'Started';

    this.menuCtrl.enable(true);

    this.chkNewOrder();

    this.avbToggle = 1;

    this.changeAvailability();

  }
    


  changeAvailability() {
    console.log("ACB"+this.available)
    if (this.available) {
      this.availableMsg = 'Available';
      this.status = "1";
    } else {
      this.availableMsg = 'Unavailable';
      this.status = "2";

    }


  }


  chkNewOrder(){
    
    //Write your code

  }



  cancelOrder(){

    this.ostatus = "5";
    //Write your code

  }

  acceptOrder(){

    this.ostatus = "2";
    //Write your code


  }

  startOrder(){

    this.ostatus = "3";
    //Write your code

    


  }

  completeOrder(){

    this.ostatus = "4";
    //Write your code


  }




}
