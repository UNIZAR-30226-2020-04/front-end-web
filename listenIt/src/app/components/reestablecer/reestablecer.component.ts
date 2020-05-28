import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.component.html'
})
export class ReestablecerComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public album: album;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public filesToUpload: Array<File>;
  public title;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = "Subir álbum";
  
  
  }ngOnInit(): void {
  }
  
  onSubmit(){

  }
}
