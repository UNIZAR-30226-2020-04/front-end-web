import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../../services/buscar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-album',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
	public buscado;
	public select;
	public view;
	public texto;
  // Lista de elementos buscados.
	public lista;
	public status;
	public identity;
	public userPhoto;
	public url;

  constructor(
  	private route: ActivatedRoute,
	private router: Router,
	private userService: UserService,
  	private buscarService: BuscarService
  ) {
  	this.buscado = false;
  	this.select = 1;
	this.view = "playlist";
	this.url = GLOBAL.url;
	this.identity = this.userService.getIdentity();
	this.userPhoto = this.url + this.identity.urlfoto;
  }

  ngOnInit(): void {
  }

  cambiarVista(vista) {
  	if( vista == 1) {
  		// Mostrar playlist
  		this.select = 1;
  		this.buscado = false;
  		this.view = "playlist";
  	}
  	else if(vista == 2) {
  		// Mostrar Artistas
   		this.select = 2;
   		this.buscado = false;
  		this.view = "artistas";
  	}
  	else if(vista == 3) {
  		// Mostrar albumes
  		this.select = 3;
  		this.buscado = false;
  		this.view = "albumes";
  	}
  	else {
  		// vista == 4
  		// Mostrar podcast
  		this.select = 4;
  		this.buscado = false;
  		this.view = "podcast";
  	}
  }

  busqueda() {
  	this.buscarService.search(this.view,this.texto).subscribe(
  		response => {
  			if(response) {
  				// Se ha recibido una lista de coincidencias
  				this.status = 'success';
  				console.log("La respuesta es valida");
  				this.lista = response;
  				console.log(this.lista);
  				this.buscado = true;
  			}
  			else {
  				this.status = 'error';
  				console.log("Algo ha ido mal. Devuelve " + response);
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

  foto(objeto){
    return this.url + objeto.urlfoto;
  }

  verElem(elem) {
	  let elemento = JSON.stringify(elem);
	  
  	// Guardar elemento al que se hace click.
  	if( this.view == "playlist") {
		  // Ver playlist
		localStorage.setItem('verLista', elemento);
  		this.router.navigate(['/VerPlay']);
  	}
  	else if(this.view == "artistas") {
		  // Ver Artistas
		localStorage.setItem('verUsuario', elemento);
  		this.router.navigate(['/VerUsuario']);
  	}
  	else if(this.view == "albumes") {
		  // Ver albumes
		localStorage.setItem('verAlbum', elemento);
  		this.router.navigate(['/VerAlbum']);
  	}
  	else {
  		// this.view = "podcast"
		  // Ver podcast
		localStorage.setItem('verPodcast', elemento);
  		this.router.navigate(['/Verpodcast']);
  	}
  }

  localVer() {
    localStorage.setItem("verUsuario",JSON.stringify(this.identity));
  }

  logout(){
      localStorage.clear();
      this.router.navigate(['/Login']);
  }
}
