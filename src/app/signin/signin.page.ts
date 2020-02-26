import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  Address1: string;
  Address2: string;
  Address3: string;
  Name: any;
  Brand: any;
  Mobile: any;
  Username: any;
  Password: any;
  sub: any;
  tid: any;

  constructor(private menuCtrl:MenuController,public toastController: ToastController,private http: HttpClient,private router: Router,private activatedRoute: ActivatedRoute) { 
 

  }

  ngOnInit() {


  }

  ionViewWillEnter() {
    //disable side bar menu
    this.menuCtrl.enable(false);
  }




  saveData() {
    this.router.navigate(['/login'])
  }

}
