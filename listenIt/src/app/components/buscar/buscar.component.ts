import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../../services/buscar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

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
	public lista;
	public status;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private buscarService: BuscarService
  ) {
  	this.buscado = false;
  	this.select = 1;
  	this.view = "playlist"
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

  verElem(elem) {
  	let elemento = JSON.stringify(elem);
  	console.log(elemento);
  	// Guardar elemento al que se hace click.
  	localStorage.setItem('elemento', elemento);

  	if( this.view == "playlist") {
  		// Ver playlist
  		this.router.navigate(['/VerPlay']);
  	}
  	else if(this.view == "artistas") {
  		// Ver Artistas
  		this.router.navigate(['/VerUsuario']);
  	}
  	else if(this.view == "albumes") {
  		// Ver albumes
  		this.router.navigate(['/VerAlbum']);
  	}
  	else {
  		// this.view = "podcast"
  		// Ver podcast
  		this.router.navigate(['/Verpodcast']);
  	}
  }
}
