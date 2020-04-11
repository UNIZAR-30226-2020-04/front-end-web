import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

	msbapTitle = 'Una canción que me he encontrado por ahí';
	msbapAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

	msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;


  constructor() { }

  ngOnInit(): void {
  }

}
