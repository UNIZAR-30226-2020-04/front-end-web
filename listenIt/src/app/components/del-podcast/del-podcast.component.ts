import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../../services/podcast.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { podcast } from '../../models/podcast';

@Component({
  selector: 'app-del-podcast',
  templateUrl: './del-podcast.component.html',
  styleUrls: ['./del-podcast.component.css']
})
export class DelPodcastComponent implements OnInit {

  public title: string;
  public selected:Array<number>;
  public selectedPodcast;
  public status;
  public token;
  public podcasts: podcast[];

  constructor(
    private _userService: UserService,
    private _podcastService: PodcastService,
    private _router: Router,
    ) { 
    this.title= "Borrar podcast"
    this.token = this._userService.getToken();
    this.selected= new Array<number>();
    this.selectedPodcast=[];
  }

  ngOnInit(): void {

    //Obtiene la lista de podcast de un usuario
    this._podcastService.getPodcasts(this.token).subscribe(
      response => {
        if(response){
          this.status = 'succes';
          this.podcasts = response;
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
  num(podcast: podcast): number{
    return this.podcasts.indexOf( podcast );
  }

  //Añade un podcast a la lista de podcasts que se van a borrar
  addSelected(podcast: podcast){
    var i = this.podcasts.indexOf( podcast );
    if (this.selected[i] != 0){
      this.selectedPodcast.push(podcast);
      this.selected[i]= 0;
    }
  }

  //Quita un podcast de la lista de podcasts que se van a borrar
  quitSelected(podcast: podcast){
    var i = this.selectedPodcast.indexOf(podcast);
    var j = this.podcasts.indexOf(podcast);
    if (this.selected[j] == 0){
      this.selectedPodcast.splice( i, 1 );
      this.selected[j]= 1;
    }
  }

  //Borra la lista de podcast seleccionada por el usuario
  deletePodcast(){
    this.selectedPodcast.forEach(element => {
      this._podcastService.deletePodcast(this.token, element.idPodcast.l_id).subscribe(
        response => {
          if(response){
            this.status = 'success';
            this.selectedPodcast = [];
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
