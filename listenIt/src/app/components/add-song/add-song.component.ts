import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { FileService } from '../../services/file.service';
import { FilesService } from '../../services/files.service';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public msg;
  public tituloAlbum;
  public nombreCancion;
  public album: album;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public title: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private fileService: FileService,
    private _filesService: FilesService,
    private _songService: SongService
  ) { 
    this.title= "Añadir canciones"

    this.album = new album("","","","","");
    this.cancion = new cancion("1","Pop","Y volar","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    // Titulo del album al que añadir canciones.
    this.tituloAlbum = localStorage.getItem('album');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSong(){
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile);
    this.fileService.uploadFile(this.token,this.tituloAlbum,this.nombreCancion,this.currentFile).subscribe(
      response => {
        if(response) {
          //Canción añadida correctamente al album.
          this.status = "success";
        }
        else {
          //Hubo algún problema.
          this.status = "error";
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