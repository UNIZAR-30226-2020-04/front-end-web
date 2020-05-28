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
import { NgForm } from '@angular/forms';

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

  //Busca canciones por nombre y muestra la lista de resultados coincidentes
  busqueda(searchForm) {
    searchForm.resetForm();
  	this.buscarService.searchSong(this.texto).subscribe(
  		response => {
  			if(response.length != 0 ) {
  				this.status = 'success';
  				this.resultado = response;
  				console.log(this.resultado);
  				this.buscado = true;
  			}
  			else {
          this.status = 'errorB';
  			}
  		},
  		error => {
	      console.log(<any> error);
	      var errorMessage = <any> error;
	      if (errorMessage != null) {
	          this.status = 'errorB';
	      }  			
  		}
  	);
  }

//Permite selccionar una canción entre los resultados de la búsqueda
seleccionar(elegido){
  this.cancion = elegido;
  this.resultado= [this.cancion];
}

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //Añade la canción , o canciones seleccionadas a la lista.
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

  //Finaliza el proceso de subida de una playlist
  finalizar(){
    if(this.songs.length == 0) this.status = 'errorV';
    else this._router.navigate(['/Principal']);
  }

}
