import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { FileService } from '../../services/file.service';
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
  public genero;
  public album: album;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public title: string;
  public songs:Array<cancion>;
  public idAlbum;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private fileService: FileService,
    private _songService: SongService
  ) { 
    this.title= "Añadir canciones"
    this.songs=[];
    this.album = new album(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    // Titulo del album al que añadir canciones.
    this.tituloAlbum = localStorage.getItem('album');
    this.idAlbum = localStorage.getItem('idAlbum');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSong(){
    this.currentFile = this.selectedFiles.item(0);
    this.fileService.uploadFile(this.token,this.idAlbum,this.nombreCancion,this.currentFile).subscribe(
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
    if (this.status == 'success' ) this.songs.push(new cancion("",this.genero,this.nombreCancion,"","",""));
  }

}