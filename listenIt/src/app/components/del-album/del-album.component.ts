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
  public selectedAlbum: string[];
  public status;
  public token;
  public albums: album[];
  public selectedFiles:Array<string>;

  constructor(
    private _userService: UserService,
    private _albumService: AlbumService,
    private _router: Router,
    ) { 
    this.albums=[new album("","","Entre poetas y presos","","La Raíz"),new album("","","Guerra al silencio","","La Raíz"),new album("","","Bajo la piel","","SFDK")]
    this.title= "Borrar álbum"
    this.token = this._userService.getToken();
    this.selected= new Array<number>();
    this.selectedAlbum=[];
  }

  ngOnInit(): void {
    this._albumService.getAlbums(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.albums = response;
        }else{						
          this.status = 'error2';
          //this._router.navigate(['/verAlbum']);
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

  addSelected(album: album){
    var i = this.albums.indexOf( album );
    if (this.selected[i] != 0){
      this.selectedAlbum.push(album.nombre);
      this.selected[i]= 0;
    }
    console.log(this.selectedAlbum);

    
  }
  quitSelected(album: album){
    var i = this.selectedAlbum.indexOf( album.nombre );
    var j = this.albums.indexOf( album );
    if (this.selected[j] == 0){
      this.selectedAlbum.splice( i, 1 );
      this.selected[j]= 1;
    }
    console.log(this.selectedAlbum);
  }

  deleteAlbum(){
    this.selectedAlbum.forEach(element => {
      this._albumService.deleteAlbum(this.token, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            //this._router.navigate(['/verAlbum']);
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
