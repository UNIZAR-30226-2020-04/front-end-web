import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { lista } from '../../models/lista';
import { FileService } from '../../services/file.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-add-to-lista',
  templateUrl: './add-to-lista.component.html',
  styleUrls: ['./add-to-lista.component.css']
})
export class AddToListaComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public msg;
  public tituloLista;
  public nombreCancion;
  public genero;
  public lista: lista;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public title: string;
  public songs:Array<cancion>;
  public idLista;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService
  ) { 
    this.title= "Añadir canciones"
    this.cancion=new cancion("1","","jamas","","sara@sara","1")
    this.songs=[];
    this.lista = new lista(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    // Titulo del lista al que añadir canciones.
    this.tituloLista = localStorage.getItem('lista');
    this.idLista = localStorage.getItem('idLista');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSong(){
    this._listaService.addToLista(this.token,this.cancion.nombre,this.cancion.autor,this.cancion.album,this.idLista,this.cancion._id).subscribe(
      response => {
        if(response) {
          console.log("holi");
          //Canción añadida correctamente al lista.
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
  }

}
