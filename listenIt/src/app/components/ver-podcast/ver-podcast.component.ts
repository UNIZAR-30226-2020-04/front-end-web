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
  public podcast;
  public usuario: usuario;
  public identity;
  public status;
  public token;
  public capitulos;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _podcastService: PodcastService,
  ) {
    this.podcast = this._podcastService.getPodcast();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    /*this._podcastService.getCapitulos(this.token,this.podcast).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.capitulos = response;
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

  seguir(){
    this._podcastService.seguir(this.token, this.podcast.idPodcast.p_id).subscribe(
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
    this._podcastService.seguir(this.token, this.podcast.idPodcast.p_id).subscribe(
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
  /*this._podcastService.seguido(this.token, this.podcast.idPodcast.p_id).subscribe(
    response => {
      if(response){
        return 1;
      }else{						
        return 0;
      }
    },
    error => {
      console.log(<any> error);
        this.status = 'error2';
    }	
  );*/
  return 0;
}
  
}
