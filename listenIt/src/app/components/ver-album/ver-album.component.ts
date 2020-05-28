import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { UserService } from '../../services/user.service';
import { SongService } from 'src/app/services/song.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-ver-album',
  templateUrl: './ver-album.component.html',
  styleUrls: ['./ver-album.component.css']
})
export class VerAlbumComponent implements OnInit {
  public url;
  public album;
  public albumPhoto;
  public usuario: usuario;
  public identity;
  public userPhoto;
  public songs;
  public status;
  public token;
  public likes: boolean[];
  public urlCanciones;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _songService: SongService,
  ) {
    this.url = GLOBAL.url;
    this.album = this._albumService.getAlbum();
    console.log(this.album);
    this.albumPhoto = this.url + this.album.urlfoto;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.userPhoto = this.url + this.identity.urlfoto;
   }

  ngOnInit(): void {
    //Obtiene las canciones del álbum
    this._songService.getSongs(this.album).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          // Lista de canciones del album.
          this.songs = response;
          // Extraer 
          console.log(this.songs);
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
    this.songs.forEach(element => {
      this._songService.getLike(this.token,element.idCancion.l_id.l_id,element.idCancion.c_id).subscribe(
        response => {
          if(response){
            this.status = 'succes';
            var i = this.num(element);
            this.likes[i]=true;
          }else{						
            this.status = 'succes';
            var i = this.num(element);
            this.likes[i] = false;
          }
        },
        error => {
          console.log(<any> error);
            this.status = 'error';
        }	
      );
    });
  }

  like(song){
    //Guarda el like de la canción a la que el usuario ha dado like
    this._songService.like(this.token,song.idCancion.l_id.l_id,song).subscribe(
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

  unlike(song){
    //Guarda el dislike de la canción a la que el usuario ha quitado el like
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
  

  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }
}
