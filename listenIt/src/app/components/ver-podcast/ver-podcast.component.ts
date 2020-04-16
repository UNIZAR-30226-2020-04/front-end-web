import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { podcast } from '../../models/podcast';
import { PodcastService } from '../../services/podcast.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-ver-podcast',
  templateUrl: './ver-podcast.component.html',
  styleUrls: ['./ver-podcast.component.css']
})
export class VerPodcastComponent implements OnInit {
  public podcast: podcast;
  public usuario: usuario;
  public identity;
  public songs: cancion[];
  public status;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _podcastService: PodcastService,
    private _songService: SongService,
  ) {
    this.podcast = this._podcastService.getPodcast();
    this.songs=[new cancion("","","ohohohohohoho","","ohohoh",""),new cancion("","","lalalalallala","","la",""),new cancion("","","sisisisi","","isisisiis",""),new cancion("","","memememme","","mememmememe",""),new cancion("","","dododododododododo","","dodododoododododo","")];
    this.podcast = new podcast("","","Un secreto a voces","2019","La pegatina");
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this._songService.getSongs(this.token,this.podcast.nombre).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.songs = response;
        }else{						
          this.status = 'error';
          //this._router.navigate(['/verPodcast']);
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  seguir(){
    this._podcastService.seguir(this.token, this.podcast.nombre).subscribe(
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
    this._podcastService.seguir(this.token, this.podcast.nombre).subscribe(
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
    this._podcastService.seguido(this.token, this.podcast.nombre).subscribe(
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
