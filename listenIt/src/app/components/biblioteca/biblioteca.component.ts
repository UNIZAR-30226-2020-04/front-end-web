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
  public listasPropias;
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
  public userPhoto;
  
  
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
    this.userPhoto = this.url + this.identity.urlfoto;
   }

  ngOnInit(): void {
  }
  
  //Si el usuario hace click sobre cualquier album, podcast, lista o usuario, 
  //se envía la información de estos al componente ver, para que este los muestre
  localL(lista){
  	localStorage.setItem('verLista', JSON.stringify(lista));
  }
  localA(album){
  	localStorage.setItem('verAlbum', JSON.stringify(album));
  }
  localP(podcast){
  	localStorage.setItem('verPodcast', JSON.stringify(podcast));
  }
  localU(usuario){
  	localStorage.setItem('verUsuario', JSON.stringify(usuario));
  }

  //Muestra las listas que sigue el usuario
  mostrarListas(): void {
    this._listaService.getListasBiblio(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.listas = response;
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

  //Muestra las listas de reproducción que el usuario ha creado
  mostrarListasPropias(): void {
    this._listaService.getListas(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.listasPropias = response;
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

  //Muestra los álbumes de canciones a als que el usuario ha dado like
  mostrarAlbums(): void {
    this._albumService.getAlbumsBiblio(this.token).subscribe(
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

  //Muestra los usuarios de canciones a las que el usuario ha dado like
  mostrarUsuarios(): void {
    this._userService.getUserBiblio(this.token).subscribe(
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
    );
  }

  //Muestra los podcast que el usuario sigue
  mostrarPodcasts(): void {
    this._podcastService.getPodcastsBiblio(this.token).subscribe(
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
    );
  }

  //Muestra en el sidebar el usuario actual
  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  //Permite cerrar sesión en el sidebar
  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }
}
