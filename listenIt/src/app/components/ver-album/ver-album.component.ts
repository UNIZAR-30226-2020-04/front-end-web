import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-ver-album',
  templateUrl: './ver-album.component.html',
  styleUrls: ['./ver-album.component.css']
})
export class VerAlbumComponent implements OnInit {
  public album: album;
  public usuario: usuario;
  public identity;
  public songs: cancion[];
  public status;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _songService: SongService,
  ) {
    this.album = this._albumService.getAlbum();
    this.songs=[new cancion("","","Y volar","","La Pegatina",""),new cancion("","","Saber que tu","","La Pegatina",""),new cancion("","","Lloverá y yo veré","","La Pegatina",""),new cancion("","","La ciudad de los gatos negros","","La Pegatina",""),new cancion("","","Mari Carmen","","La Pegatina","")];
    this.album = new album("","","Un secreto a voces","2019","La pegatina");
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this._songService.getSongs(this.token,this.album.nombre).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.songs = response;
        }else{						
          this.status = 'error';
          //this._router.navigate(['/verAlbum']);
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }
  
}
