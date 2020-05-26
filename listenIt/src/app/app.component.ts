import { Component } from '@angular/core';
import { usuario } from './models/usuario';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'listenIt';
  public identity;
  public usuario: usuario;
  public ruta;

  constructor(
    private _router: Router,
  ) { 
    this.ruta = _router.url;
  }
  sidebar() : Boolean{
    console.log(this.ruta);
    /*if( this.ruta == 'Buscar' || this.ruta =='Biblioteca' || this.ruta == 'Principal' || this.ruta =='Registro'){
      console.log("YES")
      return true;
    }*/
    return false;
  }


}
