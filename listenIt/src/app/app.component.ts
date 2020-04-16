import { Component } from '@angular/core';
import { usuario } from './models/usuario';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'listenIt';
  public identity;
  public usuario: usuario;
  public location;

  constructor(
    private _router: Router,
  ) { 
    this.location = _router.url;
  }
  hiddenSide() : Boolean{
    console.log(location);
    if( this.location =='/Login' || this.location =='/Registro'){
      return true;
    }
    return false;
  }

  hiddenRep() : Boolean{
    if( this.location !='/Login' || this.location !='/Registro'){
      return true;
    }
    return false;
  }

}
