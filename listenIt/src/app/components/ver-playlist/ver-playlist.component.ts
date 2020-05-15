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
    this.songs=[new cancion("","","My blood","","TØP",""),new cancion("","","Neon Gravestones","","TØP",""),new cancion("","","Entre Poetas y Presos","","La Raíz",""),new cancion("","","Y Volar","","La Pegatina",""),new cancion("","","A la Sombra de la Sierra","","La Raíz","")];
    this.lista = new lista(null,"","Mi playlist","2020","Sara");
    this.token = this._userService.getToken();
   }

   ngOnInit(): void {
    this._songService.getSongs(this.lista).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.songs = response;
        }else{						
          this.status = 'error';
          //this._router.navigate(['/verLista']);
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  seguir(){
      this._listaService.seguir(this.token, this.lista.nombre).subscribe(
        response => {
          if(response){
            this.status = 'succes';
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

  dejarSeguir(){
      this._listaService.seguir(this.token, this.lista.nombre).subscribe(
        response => {
          if(response){
            this.status = 'succes';
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

  seguido(): number{
      this._listaService.seguido(this.token, this.lista.nombre).subscribe(
      response => {
        if(response){
          this.status = 'succes';
          return 1;
        }else{						
          this.status = 'error2';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );
    return 0;
  }
  
}
