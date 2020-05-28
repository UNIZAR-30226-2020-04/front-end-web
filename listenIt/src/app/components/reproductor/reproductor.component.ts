import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player'; 

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

 
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
     
  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'Link to Audio One URL'
    },
    {
      title: 'Audio Two Title',
      link: 'Link to Audio Two URL'
    },
    {
      title: 'Audio Three Title',
      link: 'Link to Audio Three URL'
    },
  ];

	
  public msbapTitle ='';
  public msbapAudioUrl = '';
	msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;

 
  constructor() { }

  ngOnInit(): void {
    //this.msbapTitle = 'Una canción';
    //this.msbapAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  }

  // Actualizar la canción del reproductor si se requiere.
  ngDoCheck() {
    // Dos posibilidades: Reproducir una canción o reproducir una lista de reproduccion.
    //this.msbapTitle = localStorage.getItem("titulo-reprod");
    if(this.msbapAudioUrl != localStorage.getItem("URL-reprod")) {
      console.log("Actualizando reproductor");
      this.msbapTitle = "DORIME AMENO";
      this.msbapAudioUrl = localStorage.getItem("URL-reprod");
      console.log("Nueva cancion: " + this.msbapAudioUrl);
    }
    
  }

}
