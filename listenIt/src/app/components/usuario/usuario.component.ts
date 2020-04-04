import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
  public title: string;
  constructor() { 
    this.title = 'Usuario';
  }

  ngOnInit(): void {
  }

}
