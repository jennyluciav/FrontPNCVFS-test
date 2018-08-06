import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('coddpto') coddpto: any;
  @ViewChild('codprov') codprov: any;
  @ViewChild('coddist') coddist: any;
  @ViewChild('codcenp') codcenp: any;
  @ViewChild('codserv') codserv: any;
  title = 'app';
  dpto: any;prov:any;dist:any;cenp:any;serv:any;groups: any;
  map: google.maps.Map;
  infowindow: any;
  limites: any;
  markers = [];
  icons: any;

  constructor(private http: HttpClient){
    this.getDptos();
    let iconBase = 'assets/images/';
    this.icons= {
      CEM: {
        icon: iconBase + 'femiwhit.png'
      },
      CAI: {
        icon: iconBase + 'caiwhit.png'
      },
      SAU: {
        icon: iconBase + 'sauwhit.png'
      },
      ER: {
        icon: iconBase + 'ruralwhit.png'
      }
    };
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

  ngAfterContentInit() {
    let mapProp = {
      center: new google.maps.LatLng(-8.559, -73.655),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.zoomLimitePolitico("00");
    this.coddpto=this.coddpto.nativeElement;
    this.codprov=this.codprov.nativeElement;
    this.coddist=this.coddist.nativeElement;
    this.codcenp=this.codcenp.nativeElement;
    this.codserv=this.codserv.nativeElement;
  }

  zoomLimitePolitico(ubigeo){
    //alert(ubigeo);
    //this.limites.setMap(null);
    //alert(ruta);
    this.limites  = new google.maps.KmlLayer({
      url: 'https://sites.google.com/site/kmlfilespncvfs/home/00.kml',
      preserveViewport: false
    });
    this.limites.setMap(this.map);
    //limites.setMap(null);
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  getDptos() {
    this.http.get('http://localhost/BackPNCVFS/ubigeo_dpto.php').subscribe((data: any) => {
      this.dpto=data.dpto;
    });
  }
  getProv(){
    this.http.get('http://localhost/BackPNCVFS/ubigeo_prov.php?codigo='+this.coddpto.value).subscribe((data: any) => {
      this.codprov.value='00';
      this.coddist.value='00';
      this.codcenp.value='0000';
      this.prov=data.prov;
      this.dist=[];
      this.cenp=[];
      this.getServicios();
    });
  }

  getDist(){
    this.http.get('http://localhost/BackPNCVFS/ubigeo_dist.php?codigo='+this.coddpto.value+this.codprov.value).subscribe((data: any) => {
      this.coddist.value='00';
      this.codcenp.value='0000';
      this.dist=data.dist;
      this.cenp=[];
      this.getServicios();
    });
  }

  getCenP(){
    this.http.get('http://localhost/BackPNCVFS/ubigeo_cenp.php?codigo='+this.coddpto.value+this.codprov.value+this.coddist.value).subscribe((data: any) => {
      this.codcenp.value='0000';
      this.cenp=data.cenp;
      this.getServicios();
    });
  }
  getServicios(){
    this.http.get('http://localhost/BackPNCVFS/ubigeo_servicios.php?codigo='+this.coddpto.value+this.codprov.value+this.coddist.value+this.codcenp.value).subscribe((data: any) => {
      this.serv=data.serv;
      this.codserv.value='00';
      
      this.redibujarMarcadores();
      this.enfocarCentroPoblado();
      let opts = '<option value="00">Servicio</option>';
      
      for(var key in Object.keys(this.groups)){
        opts = opts + '<option value="'+Object.keys(this.groups)[key]+'">'+this.groups[Object.keys(this.groups)[key]]+'</option>';
      }
      
      this.codserv.innerHTML=opts;
      console.log(data);
    });
  }

  redibujarMarcadores(){
    this.borrarMarcadores();
    this.dibujarMarcadores();
  }

  borrarMarcadores(){
    for(let mar of this.markers){
      mar.setMap(null);
    }
    this.markers=[];
  }

  dibujarMarcadores(){
    this.groups={};
    for(let serv of this.serv){
      this.groups[serv.servicio]=serv.desserv;
      if(serv.servicio!=this.codserv.value && this.codserv.value!='00'){
        continue;
      }
      let location = new google.maps.LatLng(serv.latitud, serv.longitud);
      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: this.icons[serv.servicio].icon
      });
      let contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h5 id="firstHeading" class="firstHeading">'+serv.descripcion+'</h5>'+
      '<div id="bodyContent">'+
      'Numero de casos atendidos: '+
      '</div>'+
      '</div>';
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });    
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
      this.markers.push(marker);
    }
  }

  enfocarCentroPoblado(){
    if(this.codcenp.value!='0000'){
      for(let cp of this.cenp){
        if(cp.codcenp==this.codcenp.value){
          let location = new google.maps.LatLng(cp.latitud,cp.longitud);
          let marker = new google.maps.Circle({
            strokeColor: '#5564eb',
            strokeOpacity: 0.5,
            fillColor: '#5564eb',
            fillOpacity: 0.35,
            radius: 5000,
            center: location,
            map: this.map
          });
          this.markers.push(marker); 
          this.map.setCenter(location);
          this.map.setZoom(12);  
          break;
        }
      }
    }
  }
}
