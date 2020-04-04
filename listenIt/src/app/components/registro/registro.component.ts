import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  public title: string;
  constructor() { 
    this.title = 'Registro';
  }

  ngOnInit(): void {
  }

}
