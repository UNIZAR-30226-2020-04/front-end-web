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
  public filesToUpload: Array<File>;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = 'Usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.usuario = this.identity;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._userService.update(this.usuario).subscribe(
      response => {
        if (!response.usuario) {
            this.status = 'error';
        } else {
            this.status = 'success';
            localStorage.setItem('identity', JSON.stringify(this.usuario));

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


  //recoge del input la imagen
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

