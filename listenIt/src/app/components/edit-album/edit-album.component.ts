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
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {
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
  public selected:Array<number>;
  public selectedSong;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private fileService: FileService,
    private _songService: SongService
  ) { 
    this.title= "Editar"
    this.songs=[];
    this.selected= new Array<number>();
    this.selectedSong=[];
    this.album = new album(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = JSON.parse(localStorage.getItem('editAlbum'));
  }
  ngOnInit(){
    //Obtiene las canciones del álbum
    this._songService.getSongs(this.album).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.songs = response;
          console.log(response)
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //Sube una nueva canción, o varias, al álbum
  uploadSong(subirCancion){
    subirCancion.resetForm();
    this.currentFile = this.selectedFiles.item(0);
    this.fileService.uploadFile(this.token,this.idAlbum,this.nombreCancion,this.currentFile).subscribe(
      response => {
        if(response) {
          //Canción añadida correctamente al album.
          this.status = "success";
        }
        else {
          //Hubo algún problema.
          this.status = "errorU";
        }
      },
      error => {
          console.log(<any> error);
          var errorMessage = <any> error;
          if (errorMessage != null) {
              this.status = 'errorU';
          }
      }
    );
    if (this.status == 'success' ) this.songs.push(new cancion("",this.genero,this.nombreCancion,"","",""));
  }


  num(song): number{
    return this.songs.indexOf(song);
  }

  addSelected(song){
    var i = this.songs.indexOf(song);
    if (this.selected[i] != 0){
      this.selectedSong.push(song);
      this.selected[i]= 0;
    }
  }

  quitSelected(song){
    var i = this.selectedSong.indexOf(song);
    var j = this.songs.indexOf(song);
    if (this.selected[j] == 0){
      this.selectedSong.splice( i, 1 );
      this.selected[j]= 1;
    }
  }

  deleteSong(){
    this.selectedSong.forEach(element => {
      this._songService.deleteSong(this.album, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            this.selectedSong = [];
            this.selected = [];
            this.ngOnInit();
          }else{						
            this.status = 'error';
          }
        },
        error => {
          console.log(<any> error);
            this.status = 'error';
        }	
      );
    });
  }

  finalizar(){
    if(this.songs.length == 0) this.status = 'errorV';
    else this._router.navigate(['/Principal']);
  }
}