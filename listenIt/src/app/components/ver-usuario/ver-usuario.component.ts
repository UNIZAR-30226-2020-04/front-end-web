import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { usuario } from 'src/app/models/usuario';
import { ListaService } from 'src/app/services/lista.service';
import { PodcastService } from 'src/app/services/podcast.service';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {
  public token;
  public status;
  public usuario;
  public albums;
  public listas;
  public podcasts;
  public identity;
  public esPerfil: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService,
    private _podcastService: PodcastService,
    private _albumService: AlbumService,
  ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.usuario = this._userService.getUsuario();
    if (this.token == this.usuario.correo) this.esPerfil = true;
    else this.esPerfil = false;
  }

  ngOnInit() {
    //Busca los albumes del artista
    this._albumService.getAlbums(this.usuario.correo).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.albums = response;
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
    //Busca las listas del artista
    this._listaService.getListas(this.usuario.correo).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.listas = response;
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );

    //Busca los podcast del artista
    this._podcastService.getPodcasts(this.usuario.correo).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.podcasts = response;
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

  localEditL(lista){
  	localStorage.setItem('editLista', JSON.stringify(lista));
  }
  localEditA(album){
  	localStorage.setItem('editAlbum', JSON.stringify(album));
  }
  localEditP(podcast){
  	localStorage.setItem('editPodcast', JSON.stringify(podcast));
  }

  seguir(){
   this._userService.seguir(this.token,this.usuario.correo).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
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

  dejarSeguir(){
    this._userService.dejarSeguir(this.token,this.usuario.correo).subscribe(
       response => {
         if(response != null){
           this.status = 'succes';
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
  
   seguido() : number{
    this._userService.dejarSeguir(this.token,this.usuario.correo).subscribe(
       response => {
         if(response != null){
           return 1;
         }else{						
          return 0;
         }
       },
       error => {
         console.log(<any> error);
           this.status = 'error';
       }	
     );
    return 0;
   }


   localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }
}
