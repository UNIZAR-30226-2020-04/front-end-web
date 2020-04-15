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
  public selectedPodcast: string[];
  public status;
  public token;
  public podcasts: podcast[];
  public selectedFiles:Array<string>;

  constructor(
    private _userService: UserService,
    private _podcastService: PodcastService,
    private _router: Router,
    ) { 
    this.podcasts=[new podcast("","","Entre poetas y presos","","La Raíz"),new podcast("","","Guerra al silencio","","La Raíz"),new podcast("","","Bajo la piel","","SFDK")]
    this.title= "Borrar podcast"
    this.token = this._userService.getToken();
    this.selected= new Array<number>();
    this.selectedPodcast=[];
  }

  ngOnInit(): void {
    this._podcastService.getPodcasts(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.podcasts = response.podcasts;
        }else{						
          this.status = 'error2';
          //this._router.navigate(['/verPodcast']);
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

  addSelected(podcast: podcast){
    var i = this.podcasts.indexOf( podcast );
    if (this.selected[i] != 0){
      this.selectedPodcast.push(podcast.nombre);
      this.selected[i]= 0;
    }
    console.log(this.selectedPodcast);

    
  }
  quitSelected(podcast: podcast){
    var i = this.selectedPodcast.indexOf( podcast.nombre );
    var j = this.podcasts.indexOf( podcast );
    if (this.selected[j] == 0){
      this.selectedPodcast.splice( i, 1 );
      this.selected[j]= 1;
    }
    console.log(this.selectedPodcast);
  }

  deletePodcast(){
    this.selectedPodcast.forEach(element => {
      this._podcastService.deletePodcast(this.token, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            //this._router.navigate(['/verPodcast']);
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
