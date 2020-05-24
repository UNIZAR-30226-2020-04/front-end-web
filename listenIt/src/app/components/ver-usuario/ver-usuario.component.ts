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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService,
    private _podcastService: PodcastService,
    private _albumService: AlbumService,
  ) { 
    this.token = this._userService.getToken();
    this.usuario = this._userService.getUsuario();
    console.log(this.usuario);
  }

  ngOnInit(): void {

    //Busca los albumes del artista
    this._albumService.getAlbums(this.usuario.correo).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.albums = response;
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

    /*//Busca los podcast del artista
    this._podcastService.getPodcasts(this.usuario.idUser.u_id).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.podcasts = response;
        }else{						
          this.status = 'error';
          //this._router.navigate(['/verPodcast']);
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );*/

  }

  local(elemento){
  	localStorage.setItem('elemento', JSON.stringify(elemento));
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
    /*this._userService.dejarSeguir(this.token,this.usuario.idUser.u_id).subscribe(
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
     );*/
    return 0;
   }

}
