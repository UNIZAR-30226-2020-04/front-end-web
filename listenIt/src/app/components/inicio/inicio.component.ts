import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public generos;
  constructor() {
    this.generos=['Pop','Rock','Techno','Hip Hop','Folk','Ska','Dubstep','Jazz',
                'Blues','Reggaeton','Electrónica','country','metal','hardcore','Clásica',
                'Podcast','Funk','Disco','Bachata','Balada','Indie']
   }

  ngOnInit(): void {
  }

  login() {
  	

  }

  registro() {

  	
  }

}
