/// <reference types="googlemaps" />
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  
  constructor(private router: Router){
    //this.cargaMapa()
  }

  // cargaMapa(){
  //   let mapOptions = {
  //       mapTypeId: google.maps.MapTypeId.ROADMAP ,
  //       zoom: 5,
  //       center: new google.maps.LatLng(-8.559, -73.655)
  //   };
  //   this.map = new google.maps.Map(document.getElementById('gmap'),mapOptions);

  //   this.infowindow = new google.maps.InfoWindow({
  //       maxWidth: 300
  //   });
  //   //zoomLimitePolitico("14");
  //   google.maps.event.addListenerOnce(this.map, 'idle', function(){
  //       //loaded fully
  //       //alert('cargo todo');
  //       //zoomLimitePolitico("00");
  //   });
  //   //zoomLimitePolitico(14);
  // }

  irHome () {
    this.router.navigate(['mapa'])
  }

  irEstadisticas () {
    this.router.navigate(['estadisticas'])
  }
}
