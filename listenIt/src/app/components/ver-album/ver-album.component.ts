import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';

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
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
  ) {
    this.songs=[new cancion("","","ohohohohohoho","","ohohoh",""),new cancion("","","lalalalallala","","la",""),new cancion("","","sisisisi","","isisisiis",""),new cancion("","","memememme","","mememmememe",""),new cancion("","","dododododododododo","","dodododoododododo","")];
    this.album = new album("","","Un secreto a voces","2019","La pegatina");
   }

  ngOnInit(): void {
  }
  
}
