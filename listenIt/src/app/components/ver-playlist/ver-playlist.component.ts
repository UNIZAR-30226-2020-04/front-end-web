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
  public lista: lista;
  public usuario: usuario;
  public identity;
  public songs: cancion[];
  public token;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService,
    private _songService: SongService,
  ) {
    this.lista = this._listaService.getLista();
    this.token = this._userService.getToken();
   }

   ngOnInit(): void {
    /*this._songService.getSongsL(this.lista).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.songs = response;
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );*/
  }

  seguir(){
      this._listaService.seguir(this.token, this.lista.nombre).subscribe(
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

  dejarSeguir(){
      this._listaService.seguir(this.token, this.lista.nombre).subscribe(
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
  
}
