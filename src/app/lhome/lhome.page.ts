import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-lhome',
  templateUrl: './lhome.page.html',
  styleUrls: ['./lhome.page.scss'],
})
export class LhomePage implements OnInit {
  map;
  @ViewChild('mapElement') mapElement;
  address: string;
  lat: number;
  long: number;
  sid: any;
  newsid: any;
  shop_name: any;
  mobile: any;
  brand: any;
  status: string;

    Mlat: any;
    Mlong: any;

  constructor(public loadingController: LoadingController,private navCtrl: NavController,private storage: Storage,private router: Router,private nativeGeocoder: NativeGeocoder,private http: HttpClient,private geolocation: Geolocation,private activatedRoute: ActivatedRoute) { 
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("Lat "+resp.coords.latitude)
      console.log("Long "+resp.coords.longitude) 
      this.lat =  resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.getGeoencoder(this.lat,this.long);
      this.newAdd(this.lat,this.long)
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });


  }

     //geocoder method to fetch address from coordinates passed as arguments
     getGeoencoder(latitude,longitude){

                //Geocoder configuration
        var geoencoderOptions: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(latitude, longitude, geoencoderOptions)
        .then((result: NativeGeocoderResult[]) => {
          this.address = this.generateAddress(result[0]);
        })
        .catch((error: any) => {
          alert('Error getting location'+ JSON.stringify(error));
        });
      }

          //Return Comma saperated address
    generateAddress(addressObj){
        let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if(obj[val].length)
          address += obj[val]+', ';
        }
      return address.slice(0, -2);
    }



  ngOnInit() {


  }


  async ngAfterContentInit(): Promise<void> {

    const loading = await this.loadingController.create({});
   
    loading.present().then(() => {
  
    let options = {
      enableHighAccuracy: true,
      mapTypeControl: false,
      timeout: 10000,
      maximumAge: 100000
    }

    this.geolocation.getCurrentPosition(options).then(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 17,
        streetViewControl: false,
        disableDefaultUI: true, 
        panControl: false,
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        styles :[
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#d6e2e6"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#cfd4d5"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#7492a8"
                  }
              ]
          },
          {
              "featureType": "administrative.neighborhood",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "lightness": 25
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#dde2e3"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#cfd4d5"
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#dde2e3"
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#7492a8"
                  }
              ]
          },
          {
              "featureType": "landscape.natural.terrain",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#dde2e3"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#588ca4"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "saturation": -100
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#a9de83"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#bae6a1"
                  }
              ]
          },
          {
              "featureType": "poi.sports_complex",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#c6e8b3"
                  }
              ]
          },
          {
              "featureType": "poi.sports_complex",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#bae6a1"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#41626b"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "saturation": -45
                  },
                  {
                      "lightness": 10
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#c1d1d6"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#a6b5bb"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#9fb6bd"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "saturation": -70
                  }
              ]
          },
          {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#b4cbd4"
                  }
              ]
          },
          {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#588ca4"
                  }
              ]
          },
          {
              "featureType": "transit.station",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#008cb5"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit.station.airport",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": -5
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#a6cbe3"
                  }
              ]
          }
      ]
        
      });


      var icon = {
        url: "https://raw.githubusercontent.com/phatblat/BlueDot/0.1.1/bluedot.gif", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var marker = new google.maps.Marker({
      position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      draggable:true,
      map: this.map,
      title: 'Hello World!'
    });

    google.maps.event.addListener(marker, 'dragend', (marker) =>{
        var latLng = marker.latLng; 
        this.Mlat = latLng.lat();
        this.Mlong = latLng.lng();

        this.newAdd(this.Mlat,this.Mlong);



     }); 

    var cityCircle = new google.maps.Circle({
      strokeColor: '#5cb1e6',
      strokeOpacity: 0.2,
      strokeWeight: 0.5,
      fillColor: '#5cb1e6',
      fillOpacity: 0.35,
      map: this.map,
      center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
      radius: 70
    });



      // console.log(pos.coords);
    }).catch(err => {


    });

    loading.dismiss();

});
  
}

newAdd(latitude,longitude){

    this.Mlat = latitude;
    this.Mlong = longitude;
}

saveLocation(){

    this.navCtrl.navigateRoot(['/home'])


}

}
