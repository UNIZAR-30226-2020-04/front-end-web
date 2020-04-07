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
            //this.usuario = response.usuario;
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

  public filesToUpload: Array<File>;

  //recoge del input la imagen
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    var token = this.token;
    return new Promise(function(resolve,reject){
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i=0 ; i < files.length ; i++){
        formData.append('Image',files[i],files[i].name);
      }
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          }
          else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST',url,true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    });
  }
}

