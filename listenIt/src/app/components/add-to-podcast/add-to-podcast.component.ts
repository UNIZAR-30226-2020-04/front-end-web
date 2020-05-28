import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { podcast } from '../../models/podcast';
import { FileService } from '../../services/file.service';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-add-to-podcast',
  templateUrl: './add-to-podcast.component.html',
  styleUrls: ['./add-to-podcast.component.css']
})
export class AddToPodcastComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  public msg;
  public tituloPodcast;
  public nombreCapitulo;
  public genero;
  public podcast: podcast;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public title: string;
  public caps:Array<cancion>;
  public idPodcast;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private fileService: FileService,
    private _podcastService: PodcastService
  ) { 
    this.title= "Añadir capítulos"
    this.caps=[];
    this.podcast = new podcast(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    // Titulo del podcast al que añadir capítulos.
    this.tituloPodcast = localStorage.getItem('podcast');
    this.idPodcast = localStorage.getItem('idPodcast');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadCap(){
    this.currentFile = this.selectedFiles.item(0);
    this.fileService.uploadFile(this.token,this.idPodcast,this.nombreCapitulo,this.currentFile).subscribe(
      response => {
        if(response) {
          //Canción añadida correctamente al podcast.
          this.status = "success";
        }
        else {
          //Hubo algún problema.
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
    this.caps.push(new cancion("","",this.nombreCapitulo,"","",""));
  }

  
  finalizar(){
    if(this.caps.length == 0) this.status = 'errorV';
    else this._router.navigate(['/Principal']);
  }
}
