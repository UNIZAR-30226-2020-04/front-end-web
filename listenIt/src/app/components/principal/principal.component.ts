import { Component, OnInit } from '@angular/core';
import { album } from 'src/app/models/album';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { lista } from 'src/app/models/lista';

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
  public albums: album[];
  public listas: lista[];
    
  constructor(
  	private userService: UserService,
  	private fileService: FileService) 
  {
    this.albums= [new album(null,"","Entre poetas ","","La Raíz"),new album(null,"","Entre poetas","","La Raíz"),new album(null,"","Entre poetas","","La Raíz")];
    this.listas= [new lista(null,"","Entre poetas","","La Raíz"),new lista(null,"","Entre poetas","","La Raíz"),new lista(null,"","Entre poetas ","","La Raíz")];
  }

  ngOnInit(): void {
  	this.email = this.userService.getToken();
  }
  local(lista){
    
  }

  //Obtiene la URL de la cancion solicitada.
  reproducir() {
  	this.idAlbumRep = "1";
  	this.idCancRep = "1";
    this.fileService.getURL(this.idAlbumRep,this.idCancRep,this.email).subscribe(
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

}
