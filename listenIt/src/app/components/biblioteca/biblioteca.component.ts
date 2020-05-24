import { Component, OnInit } from '@angular/core';
import { album } from 'src/app/models/album';
import { usuario } from 'src/app/models/usuario';
import { cancion } from 'src/app/models/cancion';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlbumService } from 'src/app/services/album.service';
import { GLOBAL } from '../../services/global';
import { lista } from 'src/app/models/lista';
import { podcast } from 'src/app/models/podcast';
import { ListaService } from 'src/app/services/lista.service';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

	public select = 1;
  public albums;
  public listas;
  public podcasts;
  public usuarios;
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
    private _listaService: ListaService,
    private _albumService: AlbumService,
    private _podcastService: PodcastService,
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = "Subir álbum";
   }

  ngOnInit(): void {
  }

  mostrarAlbums(): void {
    this._albumService.getAlbums(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.albums = response;
        }else{						
          this.status = 'error2';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );
  }

  mostrarUsuarios(): void {
    /*this._userService.getUserBiblio(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.usuarios = response;
        }else{						
          this.status = 'error2';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );*/
  }

  mostrarPodcasts(): void {
    /*this._podcastService.getPodcastsBiblio(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.podcasts = response;
        }else{						
          this.status = 'error2';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );*/
  }
}
