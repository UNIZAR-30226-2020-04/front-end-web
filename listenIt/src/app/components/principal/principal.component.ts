import { Component, OnInit } from '@angular/core';
import { album } from 'src/app/models/album';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';

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
  public email;
  

  
  constructor(
  	private userService: UserService,
  	private fileService: FileService
  	) {

    this.album= new album(null,"","Entre poetas y presos","","La Raíz");
  }

  ngOnInit(): void {
  	this.email = this.userService.getToken();
  }

  //Obtiene la URL de la cancion solicitada.
  reproducir() {
  	this.idAlbumRep = "1";
  	this.idCancRep = "1";
    this.fileService.getURL(this.idAlbumRep,this.idCancRep,this.email).subscribe(
      response => {
        if (response) {
        	console.log("Respuesta: " + response);
        	localStorage.setItem("URL-reprod",response);
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
