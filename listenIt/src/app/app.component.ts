import { Component } from '@angular/core';
import { usuario } from './models/usuario';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'listenIt';
  public identity;
  public usuario: usuario;
}
