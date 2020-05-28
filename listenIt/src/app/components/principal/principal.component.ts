import { Component, OnInit } from '@angular/core';
import { album } from 'src/app/models/album';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { lista } from 'src/app/models/lista';
import { ListaService } from 'src/app/services/lista.service';
import { AlbumService } from 'src/app/services/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public status;
  public album;
  public idAlbumRep;
  public idCancRep;
  public token;
  public albums: album[];
  public listas: lista[];
  public identity;
    
  constructor(
    private _router: Router,
    private userService: UserService,
    private _listaService: ListaService,
    private _albumService: AlbumService,
  	private fileService: FileService) 
  {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this._listaService.getListas(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.listas = response;
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );


    /*this._albumService.getAlbumsBiblio(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.albums = response;
        }else{						
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error';
      }	
    );*/
  }
  localL(lista){
  	localStorage.setItem('verLista', JSON.stringify(lista));
  }
  localA(album){
  	localStorage.setItem('verAlbum', JSON.stringify(album));
  }

  //Obtiene la URL de la cancion solicitada.
  reproducir() {
  	this.idAlbumRep = "1";
  	this.idCancRep = "1";
    this.fileService.getURL(this.idAlbumRep,this.idCancRep,this.token).subscribe(
      response => {
        if (response.body) {
          console.log("Respuesta(body): " + response.body);
        	localStorage.setItem("URL-reprod",response.body);
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

  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }

}
