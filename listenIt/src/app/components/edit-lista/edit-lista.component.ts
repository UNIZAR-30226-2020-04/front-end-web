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
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-edit-lista',
  templateUrl: './edit-lista.component.html',
  styleUrls: ['./edit-lista.component.css']
})
export class EditListaComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public msg;
  public tituloLista;
  public nombreCancion;
  public genero;
  public lista;
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
  public selected:Array<number>;
  public selectedSong;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _listaService: ListaService,
    private buscarService: BuscarService,
    private _songService: SongService
  ) { 
    this.title= "Editar";
    this.songs=[];
    this.selected= new Array<number>();
    this.selectedSong=[];
    this.lista = new lista(null,"","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.lista = JSON.parse(localStorage.getItem('editLista'));
    this.buscado = false;
  	this.select = 1;
  }

  ngOnInit(){
    //Obtiene las canciones de la lista
    this._songService.getSongsL(this.lista).subscribe(
    response => {
      if(response != null){
        this.status = 'succes';
        this.songs = response;
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

  //Busca canciones por nombre y muestra la lista de resultados
  busqueda(subirCancion) {
  	this.buscarService.searchSong(this.texto).subscribe(
  		response => {
  			if(response) {
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
    subirCancion.resetForm();
  }

  //Permite seleccionar una canción entre los resultados de la búsqueda
  seleccionar(elegido){
    this.cancion = elegido;
    this.resultado= [this.cancion];
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //Añade la canción o canciones selecconadas a la lista
  uploadSong(){
    this._listaService.addToLista(this.token,this.cancion.nombre,this.cancion.idCancion.l_id.u,this.cancion.idCancion.l_id.l_id,this.lista.idRep.l_id,this.cancion.idCancion.c_id).subscribe(
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

  num(song): number{
    return this.songs.indexOf(song);
  }

  //Añade una canción a la lista de canciones seleccionadas para borrar
  addSelected(song){
    var i = this.songs.indexOf(song);
    if (this.selected[i] != 0){
      this.selectedSong.push(song);
      this.selected[i]= 0;
    }
  }

  //Quita una canción de la lista de canciones seleccionadas para borrar
  quitSelected(song){
    var i = this.selectedSong.indexOf(song);
    var j = this.songs.indexOf(song);
    if (this.selected[j] == 0){
      this.selectedSong.splice( i, 1 );
      this.selected[j]= 1;
    }
  }

  //Borra todas las canciones de la lista de canciones seleccionadas para borrar
  deleteSong(){
    this.selectedSong.forEach(element => {
      this._songService.deleteSongL(this.token,this.lista, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            this.selectedSong = [];
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
    if(this.songs.length == 0) this.status = 'errorV';
    else this._router.navigate(['/Principal']);
  }

}
