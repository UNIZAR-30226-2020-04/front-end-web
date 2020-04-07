import { Component, OnInit } from '@angular/core';
import { usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  providers: [UserService]
})
export class UsuarioComponent implements OnInit {
  public title: string;
  public usuario: usuario;
  public status: string;
  public identity;
  public token;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = 'Usuario';
    this.usuario= new usuario("","","","","","");
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._userService.register(this.usuario).subscribe(
      response => {
        let usuario = response.usuario;
        this.usuario = usuario;
        if (response) {
            this.status = 'success';
            this.usuario= new usuario("","","","","","");
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

