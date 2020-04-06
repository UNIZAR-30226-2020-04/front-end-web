import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-playlist',
  templateUrl: './crear-playlist.component.html'
})
export class CrearPlaylistComponent implements OnInit {
  public title: string;
  constructor() {
    this.title = 'Crear playlist';
  }
  ngOnInit(): void {
  }
}
