import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subir-album',
  templateUrl: './subir-album.component.html'
})
export class SubirAlbumComponent implements OnInit {
  public title: string;
  constructor() {
    this.title = 'Subir álbum';
  }
  ngOnInit(): void {
  }
}
