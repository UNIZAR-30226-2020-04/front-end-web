import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { album } from '../../models/album';

@Component({
  selector: 'app-del-album',
  templateUrl: './del-album.component.html',
  styleUrls: ['./del-album.component.css']
})
export class DelAlbumComponent implements OnInit {

  public title: string;
  public selected:Array<number>;
  public selectedAlbum: album[];
  public status;
  public token;
  public albums: album[];

  constructor(
    private _userService: UserService,
    private _albumService: AlbumService,
    private _router: Router,
    ) { 
    this.title= "Borrar álbum"
    this.token = this._userService.getToken();
    this.selected= new Array<number>();
    this.selectedAlbum=[];
  }

  ngOnInit(): void {

    //Obtiene la lista de álbumes de un usuario
    this._albumService.getAlbums(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.albums = response;
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
  
  num(album: album): number{
    return this.albums.indexOf( album );
  }

  //Añade un álbum a la lista de álbumes que se van a borrar
  addSelected(album: album){
    var i = this.albums.indexOf( album );
    if (this.selected[i] != 0){
      this.selectedAlbum.push(album);
      this.selected[i]= 0;
    }   
  }

  //Quita un álbum de la lista de álbumes que se van a borrar
  quitSelected(album: album){
    var i = this.selectedAlbum.indexOf( album);
    var j = this.albums.indexOf( album );
    if (this.selected[j] == 0){
      this.selectedAlbum.splice( i, 1 );
      this.selected[j]= 1;
    }
  }

  //Borra la lista de álbumes seleccionada por el usuario
  deleteAlbum(){
    this.selectedAlbum.forEach(element => {
      this._albumService.deleteAlbum(this.token, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            this.selectedAlbum = [];
            this.selected = [];
            this.ngOnInit();
          }else{						
            this.status = 'error';
          }
        },
        error => {
          console.log(<any> error);
            this.status = 'error';
        }	
      );
    });
  }


}
