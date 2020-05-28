import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-crear-playlist',
  templateUrl: './crear-playlist.component.html'
})
export class CrearPlaylistComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public title: string;
  public status;

  public tituloPlaylist;
  public token;

  constructor(
  	private userService: UserService,
  	private listaService: ListaService,
  	private route: ActivatedRoute,
  	private _router: Router
  	) {

    this.title = 'Crear playlist';
  }

  ngOnInit(): void {
    this.token = this.userService.getToken(); 
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //Crea la nueva playlist y la almacena para que el componente de añadir canciones la tenga
  newPlaylist() {
    this.currentFile = this.selectedFiles.item(0);
    this.listaService.createLista(this.token,this.tituloPlaylist,this.currentFile).subscribe(
      response => {
        if (response) {
          this._router.navigate(['/AddToLista']);
          localStorage.setItem('idLista', response.l_id);
          localStorage.setItem('lista',this.tituloPlaylist);
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