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
  public songs;
  public token;
  public status;
  public likes: boolean[];
  public seguida;

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
    this.userPhoto = this.url + this.identity.urlfoto;
   }

   ngOnInit(): void {
    this._songService.getSongsL(this.lista).subscribe(
      response => {
        if(response){
          this.status = 'succes';
          this.songs = response;
          console.log(this.songs);
          //this.isLiked();
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
    this.seguido();
  }

  repCancion(cancion) {
    // Reproducir cancion seleccionada.
    let track = [{title: cancion.nombre, link: (this.url + cancion.mp3)}];
    console.log(track);
    // Enviar lista a reproductor.
    localStorage.setItem("listaReproduccion",JSON.stringify(track));
    // Indicar al reproductor que puede trabajar.
    localStorage.setItem("eventoReprod","actualizar");
  }

  repLista() {
    let track = new Array();
    for(let i in this.songs) {
      // Recorrer todas las canciones
      track.push({title: this.songs[i].nombre, link: (this.url + this.songs[i].mp3)});
    }
    console.log(track);
    localStorage.setItem("listaReproduccion",JSON.stringify(track));
    localStorage.setItem("eventoReprod","actualizar");
  }

  isLiked(){
    //Comprueba que canciones de la playlist que te gustan, y cuáles no
    /*this.songs.forEach(element => {
      this._songService.getLike(this.token,element.idCancion.l_id.l_id,element.idCancion.c_id).subscribe(
        response => {
          if(response){
            this.status = 'succes';
            var i = this.num(element);
            this.likes[i]=true;
          }else{						
            this.status = 'succes';
            var i = this.num(element);
            this.likes[i]=false;
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
    /*//Guarda el like de la canción a la que el usuario ha dado like
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
    );*/
  }

  unlike(song){
   /*//Guarda el dislike de la canción a la que el usuario ha quitado el like
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
    );*/
  }

  num(song): number{
    return this.songs.indexOf(song);
  }

  seguir(){
    //Sigue la lista de reproducción
    this._listaService.seguir(this.token, this.lista).subscribe(
      response => {
        if(response){
          this.status = 'succes';
          this.seguido();
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
    //Deja de seguir la lista de reproducción
    this._listaService.dejarSeguir(this.token, this.lista).subscribe(
      response => {
        if(response){
          console.log("BIEN");
          this.status = 'succes';
          this.seguido();
        }else{			
          console.log("MAL");			
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  seguido(){
    //Comprueba al cargar la página si sigues la lista de reproducción, para mostrar el botón correcto
    this._listaService.seguido(this.token, this.lista).subscribe(
      response => {
        if(response){
          console.log("BIEEN");
          this.seguida = 1;
        }else{			
          console.log("MAL");	
          this.seguida = 0;	
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }
  
}
