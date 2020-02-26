import { Component, OnInit} from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: string;
  password: string;
  sid: any;

  constructor(private statusBar: StatusBar,private menuCtrl:MenuController,private navCtrl: NavController,public toastController: ToastController,private locationAccuracy: LocationAccuracy,private androidPermissions: AndroidPermissions,private http: HttpClient,private router: Router,private storage: Storage) {

    this.checkGPSPermission();

  }

  ngOnInit() {

// set status bar to white
this.statusBar.backgroundColorByHexString('#929496');


  }

  ionViewWillEnter() {
    //disable side menu 
    this.menuCtrl.enable(false);
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }


  chkLogin(){

    this.navCtrl.navigateRoot(['/location'])

  }

  goSignup(){

    this.router.navigate(['/signin']);
   
  }



}
