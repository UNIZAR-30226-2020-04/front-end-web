import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { lista } from '../../models/lista';
import { ListaService } from '../../services/lista.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-ver-playlist',
  templateUrl: './ver-playlist.component.html',
  styleUrls: ['./ver-playlist.component.css']
})

export class VerPlaylistComponent implements OnInit {
  public url;
  public lista;
  public listaPhoto;
  public usuario: usuario;
  public userPhoto;
  public identity;
  public songs: cancion[];
  public token;
  public status;
  public likes: boolean[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService,
    private _songService: SongService,
  ) {
    this.url = GLOBAL.url;
    this.lista = this._listaService.getLista();
    console.log(this.lista);
    this.listaPhoto = this.url + this.lista.urlfoto;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
    this.userPhoto = this.url + this.identity.urlfoto;
   }

   ngOnInit(): void {
    this._songService.getSongsL(this.lista).subscribe(
      response => {
        if(response){
          this.status = 'succes';
          this.songs = response;
          this.isLiked();
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

  isLiked(){
    //Comprueba que canciones del álbum te gustan, y cuáles no
    /*this.songs.forEach(element => {
      this._songService.getLike(this.token,element.idCancion.l_id.l_id,element.idCancion.c_id).subscribe(
        response => {
          if(response != null){
            this.status = 'succes';
            var i = this.num(element);
            this.likes[i]=response;
          }else{						
            this.status = 'error';
          }
        },
        error => {
          console.log(<any> error);
            this.status = 'error';
        }	
      );
    });*/
  }

  like(song){
    this._songService.like(this.token,song.idCancion.l_id.l_id,song).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.isLiked();
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

  unlike(song){
    this._songService.unlike(this.token,song.idCancion.l_id.l_id,song).subscribe(
      response => {
        if(response){
          this.status = 'succes';
          this.isLiked();
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

  num(song): number{
    return this.songs.indexOf(song);
  }

  seguir(){
    this._listaService.seguir(this.token, this.lista).subscribe(
      response => {
        if(response){
          this.status = 'succes';
        }else{						
          this.status = 'error';
          console.log(response);
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  dejarSeguir(){
    this._listaService.seguir(this.token, this.lista).subscribe(
      response => {
        if(response){
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

  seguido(): number{
     /* this._listaService.seguido(this.token, this.lista.nombre).subscribe(
      response => {
        if(response){
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

  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }
  
}
