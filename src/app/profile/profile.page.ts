import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  sid: any;
  shop_name: any;
  mobile: any;
  brand: any;
  address: any;


  constructor(private http: HttpClient,private navCtrl: NavController,private storage: Storage) { }

  ngOnInit() {

    this.shop_name = "Jhon Gas";
    this.address = "No 1 Newcity";
    this.mobile = "98542145";
    this.brand = "Shell";

  }

  goBack(){
    this.navCtrl.navigateRoot(['/home'])
  }

}
