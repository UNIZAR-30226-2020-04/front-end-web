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
    //private _artistService: ArtistService
  ) { 
    this.album = new album("","","","","");
    this.cancion = new cancion("","","","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = "Subir álbum";
   }

  ngOnInit(): void {
    console.log('subir-album1.component.ts cargado');
  }
  onSubmit2(){
    console.log(this.cancion);
  }

  onSubmit(){
		this._route.params.forEach((params: Params) => {
			let artist_id = params['artist'];
      this.album.autor = artist_id;

			this._albumService.addAlbum(this.token, this.album).subscribe(
				response => {
					if(!this.album){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El album se ha creado correctamente!';						
            
            
           /* // Subir la imagen del album
							this.makeFileRequest(this.url+'upload-image-album/'+ id, [], this.filesToUpload, this.token, 'image')
              .then(
                (result) => {
                },
                (error) => {
                  console.log(error);
                }
              );
            */
            this._router.navigate(['/subirCanc', this.album._id]);
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
		});
  }
  
  //recoge del input la imagen
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
