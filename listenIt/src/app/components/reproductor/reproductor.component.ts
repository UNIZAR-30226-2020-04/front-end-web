import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

	
  public msbapTitle;
  public msbapAudioUrl;
	msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;


  constructor() { }

  ngOnInit(): void {
    this.msbapTitle = 'Una canción';
    this.msbapAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  }

  // Actualizar la canción del reproductor si se requiere.
  ngDoCheck() {
    /*
    //this.msbapTitle = localStorage.getItem("titulo-reprod");
    console.log("Actualizando reproductor");
    this.msbapTitle = "The Hype";
    this.msbapAudioUrl = localStorage.getItem("URL-reprod");
    */
  }

}
