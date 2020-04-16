import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subir-podcast',
  templateUrl: './subir-podcast.component.html'
})
export class SubirPodcastComponent implements OnInit {

  public title: string;
  public status;

  public tituloPodcast;
  public email;

  constructor(
  	private userService: UserService,
  	private fileService: FileService,
  	private route: ActivatedRoute,
  	private router: Router
  	) {

    this.title = 'Subir podcast';
  }

  ngOnInit(): void {
  	this.email = this.userService.getToken();
  }

  newPodcast() {
    this.fileService.createPodcast(this.email,this.tituloPodcast).subscribe(
      response => {
        if (response) {
        	this.status = "success";
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
