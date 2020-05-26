import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { PodcastService } from 'src/app/services/podcast.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-subir-podcast',
  templateUrl: './subir-podcast.component.html'
})
export class SubirPodcastComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public title: string;
  public status;
  public identity;
  public token;
  public tituloPodcast;
  public _url;

  constructor(
  	private _userService: UserService,
    private _podcastService: PodcastService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) {

    this.title = 'Subir podcast';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this._url = GLOBAL.url;
  }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  newPodcast() {
    this.currentFile = this.selectedFiles.item(0);
    this._podcastService.createPodcast(this.token,this.tituloPodcast,this.currentFile).subscribe(
      response => {
        if (response) {
          this.status = "success";
          localStorage.setItem('idPodcast', response.l_id);
          localStorage.setItem('podcast',this.tituloPodcast);
          //this._router.navigate(['/SubirPodcast']);
        }
        else {
        	this.status = "error";
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
