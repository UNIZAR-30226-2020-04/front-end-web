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
  [x: string]: any;
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
    this.usuario= new usuario("","","","","","");
   }

  ngOnInit(): void { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  onSubmit() {
    this._userService.signup(this.usuario).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
          console.log(response);
          console.log(this.identity)
          if (!this.identity) {
              this.status = 'error';
          } else {
              this.status = 'success';
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this._userService.signup(this.usuario, 'true').subscribe(
                response => {
                    let token = response.token;
                    this.token = token;
                    if (this.token.length <= 0) {
                        this.status = 'error';
                    } else {
                        localStorage.setItem('token', token);
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

