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
  selectedFiles: FileList;
  currentFile: File;
  public title: string;
  public usuario: usuario;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = 'Registro';
    this.usuario= new usuario("","",null,"","","");
  }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    this.currentFile = this.selectedFiles.item(0);
    this.usuario.foto = this.currentFile;
    this._userService.register(this.usuario).subscribe(
      response => {
        if (response) {
            this.status = 'success';
            localStorage.setItem('identity', JSON.stringify(this.usuario));
            localStorage.setItem('token', this.usuario.correo);
            this._router.navigate(['/Principal']);
        } else {
            this.status = 'error';
        }
    },
    error => {
        console.log(<any>error);
        this.status = 'error';
    }
  ); }
}
