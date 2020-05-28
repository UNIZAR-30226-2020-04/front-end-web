import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player'; 

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {
  public event = "esperar";

  // Mostrar o no el titulo de la cancion
  msaapDisplayTitle = false;
  // Mostrar o no la lista de reproduccion
  msaapDisplayPlayList = false;
  // Reproducir audio automaticamente o no.
  msaapAutoPlay = true;
  // Items en la playlist.
  msaapPageSizeOptions = [2,4,6];
  // Mostrar o no control de volumen.
  msaapDisplayVolumeControls = true;
  // Minimizar playlist o no.
  msaapExpanded = false;
     
  // Lista de reproduccion.
  msaapPlaylist: Track[];

  constructor() { }

  ngOnInit(): void {

  }

  // Actualizar la canción del reproductor si se requiere.
  ngDoCheck() {
    // Si no ha ocurrido un evento (seleccion de lista/cancion/capitulo...) no se hace nada.
    this.event = (localStorage.getItem("eventoReprod"));
    if(this.event == "actualizar") {
      console.log("Actualizando reproductor con:");
      // Dos posibilidades: Reproducir una canción o reproducir una lista de reproduccion.
      let listaReprod = JSON.parse(localStorage.getItem("listaReproduccion"));
      // Comprobar si hay 0, 1 o más elementos
      let length = listaReprod.length;
      if(length == 1) {
        console.log("Unica cancion");
        // Se ha seleccionado un unico elemento para reproducir
        this.msaapPlaylist = new Track[length];
        // listaReprod tiene el siguiente formato: [{title1,url1}, {title2,url2}...{titleN,urlN}]
        for(let i in this.msaapPlaylist) {
          this.msaapPlaylist[i].title = listaReprod[i].title;
          this.msaapPlaylist[i].link = listaReprod[i].url;
        }
        // No mostrar la lista de reproduccion, no es necesaria.
        this.msaapDisplayPlayList = false;
        this.msaapDisplayTitle = true;
        this.event = "esperar";
      }
      else if(length > 1) {
        console.log("Lista de reproduccion");
        // Se desea reproducir una lista de elementos.
        this.msaapPlaylist = new Track[length];
        // listaReprod tiene el siguiente formato: [{title1,url1}, {title2,url2}...{titleN,urlN}]
        for(let i in this.msaapPlaylist) {
          this.msaapPlaylist[i].title = listaReprod[i].title;
          this.msaapPlaylist[i].link = listaReprod[i].url;
          this.event = "esperar";
        }
        // Mostrar playlist.
        this.msaapDisplayTitle = true;
        this.msaapDisplayPlayList = true;
      }
      // Una vez terminado se bloquean las actualizaciones hasta nuevo evento.
      this.event = "esperar";
    }
  }
}