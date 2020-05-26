import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { UserService } from '../../services/user.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-subir-album1',
  templateUrl: './subir-album1.component.html'
})
export class SubirAlbum1Component implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  public album: album;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public filesToUpload: Array<File>;
  public title;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
  ) { 
    this.album = new album(null,"","","","");
    this.cancion = new cancion("","","","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = "Subir álbum";
   }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(){
    this.currentFile = this.selectedFiles.item(0); 
		this._albumService.addAlbum(this.token, this.album,this.currentFile).subscribe(
			response => {
				if(!response){
					this.status = 'Error';
				}
        else {
          localStorage.setItem('idAlbum', response.l_id);
          localStorage.setItem('album',this.album.nombre);
          this._router.navigate(['/SubirCanc']);
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
  
  //recoge del input la imagen
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
