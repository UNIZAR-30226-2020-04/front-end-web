import { Component, OnInit } from '@angular/core';
import { usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  public title: string;
  public identity;
  public usuario: usuario;
  public status: string;
  public token;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Inicio de sesión';
    this.usuario= new usuario("","Pepe","","","Pepe12345","11-1-1998");
   }

  ngOnInit(): void { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit() {
    this._userService.signup(this.usuario).subscribe(
      response => {
        if (response.correo == null) {
          this.status = 'error';
        }
        else {
          this.status = 'success';
          this.identity = response;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          localStorage.setItem('token', this.identity.correo);
        }
      },
      error => {
          console.log(<any> error);
          var errorMessage = <any> error;
          if (errorMessage != null) {
              this.status = 'error';
          }
      }
  );
  }
}
