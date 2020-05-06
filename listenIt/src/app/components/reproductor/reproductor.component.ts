import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

	msbapTitle = 'Una canción';
	msbapAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

	msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;


  constructor() { }

  ngOnInit(): void {
  }

  // Actualizar la canción del reproductor si se requiere.
  ngDoCheck() {
    //this.msbapTitle = localStorage.getItem("titulo-reprod");
    console.log("Actualizando reproductor");
    this.msbapTitle = "The Hype";
    this.msbapAudioUrl = localStorage.getItem("URL-reprod");
  }

}
