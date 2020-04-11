import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-del-album',
  templateUrl: './del-album.component.html',
  styleUrls: ['./del-album.component.css']
})
export class DelAlbumComponent implements OnInit {

  public title: string;
  public selected:Array<number>;
  public status;
  public token;
  public selectedFiles:Array<string>

  constructor(
    private _userService: UserService,
    private _albumService: AlbumService,
    private _router: Router,
    ) { 
    
    this.title= "Añadir canciones"
    this.token = this._userService.getToken();
    this.selected= new Array<number>();
    this.selected[1] = 0;
    this.selected[2] = 0;
    this.selected[3] = 0;
    this.selected[4] = 0;
  }

  ngOnInit(): void {

  }

  addSelected(nombreAlbum){
    this.selectedFiles;
  }
  quitSelected(){
  }

  deleteAlbum(){
    var nombreAlbum: string;
    this._albumService.deleteAlbum(this.token, nombreAlbum).subscribe(
      response => {
        if(nombreAlbum == null){
          this.status = 'error';
        }else{						
          this.status = 'success';
          //this._router.navigate(['/verAlbum']);
        }
      },
      error => {
        console.log(<any> error);
        var errorMessage = <any> error;
        if (errorMessage != null) {
            this.status = 'error';
        }
    }	
    );
  }

}
