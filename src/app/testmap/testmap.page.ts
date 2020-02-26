import { Component, OnInit } from '@angular/core';
import { AfterContentInit, ViewChild} from '@angular/core';
declare var google;

@Component({
  selector: 'app-testmap',
  templateUrl: './testmap.page.html',
  styleUrls: ['./testmap.page.scss'],
})
export class TestmapPage implements OnInit {

map;
@ViewChild('mapElement') mapElement;

  constructor() { }

  ngOnInit(){
  }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
  }

}
