import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { podcast } from '../../models/podcast';
import { FileService } from '../../services/file.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { PodcastService } from 'src/app/services/podcast.service';

@Component({
  selector: 'app-edit-podcast',
  templateUrl: './edit-podcast.component.html',
  styleUrls: ['./edit-podcast.component.css']
})
export class EditPodcastComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public msg;
  public tituloPodcast;
  public nombreCap;
  public podcast;
  public usuario: usuario;
  public identity;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public title: string;
  public caps;
  public idPodcast;
  public selected:Array<number>;
  public selectedCap;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _podcastService: PodcastService,
    private fileService: FileService,
  ) { 
    this.title= "Editar"
    this.caps=[];
    this.selected= new Array<number>();
    this.selectedCap=[];
    this.podcast = new podcast(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.podcast = JSON.parse(localStorage.getItem('editPodcast'));
  }
  ngOnInit(){
    //Obtiene los capítulos del podcast
    this._podcastService.getCapitulos(this.token,this.podcast.idPodcast.l_id).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.caps = response;
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //Sube un nuevo capítulo, o varios, al podcast
  uploadCap(subirCap){/*
    this.currentFile = this.selectedFiles.item(0);
    this.fileService.uploadFile(this.token,this.idPodcast,this.nombreCap,this.currentFile).subscribe(
      response => {
        if(response) {
          this.status = "success";
        }
        else {
          this.status = "errorU";
        }
      },
      error => {
          console.log(<any> error);
          var errorMessage = <any> error;
          if (errorMessage != null) {
              this.status = 'errorU';
          }
      }
    );
    if (this.status == 'success' ) this.caps.push(new podcast(null,"",this.nombreCap,"",""));
    subirCap.resetForm();*/
  }


  num(cap): number{
    return this.caps.indexOf(cap);
  }

  //Añade un capítulo a la lista de capítulos seleccionados para borrar
  addSelected(cap){
    var i = this.caps.indexOf(cap);
    if (this.selected[i] != 0){
      this.selectedCap.push(cap);
      this.selected[i]= 0;
    }
  }

  //Quita un capítulo de la lista de capítulos seleccionados para borrar
  quitSelected(cap){
    var i = this.selectedCap.indexOf(cap);
    var j = this.caps.indexOf(cap);
    if (this.selected[j] == 0){
      this.selectedCap.splice( i, 1 );
      this.selected[j]= 1;
    }
  }

  //Borra todos los capítulos de la lista de capítulos seleccionados para borrar
  deleteCap(){
    this.selectedCap.forEach(element => {
      this._podcastService.deleteCap(this.podcast, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            this.selectedCap = [];
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

  finalizar(){
    if(this.caps.length == 0) this.status = 'errorV';
    else this._router.navigate(['/Principal']);
  }
}