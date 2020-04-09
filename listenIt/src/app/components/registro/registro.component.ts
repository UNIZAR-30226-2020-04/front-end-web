import { Component, OnInit } from '@angular/core';
import { usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
  public title: string;
  public usuario: usuario;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = 'Registro';
    this.usuario= new usuario("","","","","","");
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._userService.register(this.usuario).subscribe(
      response => {
        if (response) {
            this.status = 'success';
            this.usuario = response;
            localStorage.setItem('identity', JSON.stringify(this.usuario));
            localStorage.setItem('token', this.usuario.correo);
            this._router.navigate[('/Inicio')];
        } else {
            this.status = 'error';
        }
    },
    error => {
        console.log(<any>error);
    }
  ); }
}
