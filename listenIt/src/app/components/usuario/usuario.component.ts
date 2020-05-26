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
  selectedFiles: FileList;
  currentFile: File;
  public title: string;
  public usuario: usuario;
  public status: string;
  public identity;
  public token;
  public myEmail;
  public newName;
  public newNick
  public myPassA;
  public myPassB;
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
    console.log(this.identity);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  cambiarNombre() {
    this._userService.changeName(this.token,this.usuario.nombre,this.newName).subscribe(
      response => {
        if(response) {
          this.status = 'success';
          this.identity.nombre = this.newName;
          localStorage.setItem("identity",JSON.stringify(this.identity));
        }
        else {
          this.status = 'error';
        }
      },
      (error: any) => {
        console.log(<any> error);
        var errorMessage = <any> error;
        if (errorMessage != null) {
            this.status = 'error';
        }
      }
    );
  }

  cambiarNick() {
    this._userService.changeNick(this.token,this.usuario.nick,this.newNick).subscribe(
      response => {
        if(response) {
          this.status = 'success';
          this.identity.nick = this.newNick;
          localStorage.setItem("identity",JSON.stringify(this.identity));
        }
        else {
          this.status = 'error';
        }
      },
      (error: any) => {
        console.log(<any> error);
        var errorMessage = <any> error;
        if (errorMessage != null) {
            this.status = 'error';
        }
      }
    );
  }

  cambiarFoto() {
    this.currentFile = this.selectedFiles.item(0);
    this._userService.changePhoto(this.token,this.currentFile).subscribe(
      response => {
        if(response) {
          this.status = 'success';
        }
        else {
          this.status = 'error';
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

  cambiarPass() {
    this._userService.changePass(this.token,this.myPassA,this.myPassB).subscribe(
      response => {
        if(response) {
          this.status = 'success';
          this.identity.pass = this.myPassB;
          localStorage.setItem("identity",JSON.stringify(this.identity));
        }
        else {
          this.status = 'error';
        }
      },
      (error: any) => {
        console.log(<any> error);
        var errorMessage = <any> error;
        if (errorMessage != null) {
            this.status = 'error';
        }
      }
    );
  }

  // Elimina la cuenta del usuario.
  delete() {
    this._userService.deleteAccount(this.myEmail,this.myPassA,this.myPassB).subscribe(
      (response: any) => {
        if(response) {
          // Cuenta eliminada.
          this.status = "success";
          localStorage.clear();
          this._router.navigate(['/Login']);
        }
        else {
          this.status = "error";
        } 
      },
      (error: any) => {
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

