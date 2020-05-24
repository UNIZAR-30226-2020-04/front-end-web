import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { lista } from '../../models/lista';
import { FileService } from '../../services/file.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';
import { ListaService } from 'src/app/services/lista.service';
import { BuscarService } from 'src/app/services/buscar.service';

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
  public cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public title: string;
  public songs:Array<cancion>;
  public idLista;
  public buscado;
	public select;
  public texto;
  public resultado;
  
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService,
    private buscarService: BuscarService
  ) { 
    this.title= "Añadir canciones";
    this.songs=[];
    this.lista = new lista(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.buscado = false;
  	this.select = 1;
  }

  ngOnInit(){
    // Titulo del lista al que añadir canciones.
    this.tituloLista = localStorage.getItem('lista');
    this.idLista = localStorage.getItem('idLista');
  }

  busqueda() {
    console.log(this.texto)
  	this.buscarService.searchSong(this.texto).subscribe(
  		response => {
  			if(response) {
  				this.status = 'success';
  				this.resultado = response;
  				console.log(this.resultado);
  				this.buscado = true;
  			}
  			else {
  				this.status = 'error';
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

seleccionar(elegido){
  this.cancion = elegido;
  this.resultado= [this.cancion];
}

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSong(){
    this._listaService.addToLista(this.token,this.cancion.nombre,this.cancion.idCancion.l_id.u,this.cancion.idCancion.l_id.l_id,this.idLista,this.cancion.idCancion.c_id).subscribe(
      response => {
        if(response) {
          this.status = "success";
          this.resultado=[];
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
    if (this.status = 'success' ) this.songs.push(this.cancion);
  }

}
