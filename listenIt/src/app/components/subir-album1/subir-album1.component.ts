import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';


@Component({
  selector: 'app-subir-album1',
  templateUrl: './subir-album1.component.html'
})
export class SubirAlbum1Component implements OnInit {
  public album: album;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) { 
    this.album = new album("","","","");
    this.cancion = new cancion("","","","");
    this.identity = _userService.getIdentity();
   }

  ngOnInit(): void {
    console.log('subir-album1.component.ts cargado');
  }
  onSubmit2(){
    console.log(this.cancion);
  }

  onSubmit(){
    console.log(this.album);
  }

}
