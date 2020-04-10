import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { usuario } from '../../models/usuario';
import { album } from '../../models/album';
import { FilesService } from '../../services/files.service';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { cancion } from 'src/app/models/cancion';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  public album: album;
  public usuario: usuario;
  public identity;
  public cancion: cancion;
  public token;
  public alertMessage;
  public url;
  public status: string;
  public filesToUpload: Array<File>;
  public title: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _filesService: FilesService,
    private _songService: SongService
  ) { 
    this.title= "Añadir canciones"
    this.album = new album("","","","","");
    this.cancion = new cancion("1","Pop","Y volar","","","");
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    
  }

  onSubmit(){

		this._route.params.forEach((params: Params) => {
			let album_id = params['album'];
			this.cancion.album = album_id;

			this._songService.addSong(this.token, this.cancion).subscribe(
				response => {
					
					if(!response.cancion){
						this.status = 'error';
					}else{
						this.cancion = response.cancion;
           
            if(!this.filesToUpload){
							this.status = 'error';
						}else{
							// Subir el fichero de audio
							this._filesService.makeFileRequest(this.url+'upload-file-song/'+album_id, [], this.filesToUpload, this.token)
								.then(
									(result) => {
										this._router.navigate(['/album', response.song.album]);
									},
									(error) => {
										console.log(error);
									}
								);
						}
					}

				},
				error => {
					var errorMessage = <any>error;
			        if(errorMessage != null){
			          this.status = 'error';
			          console.log(error);
			        }
				}	
			);
		});
  }
  
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

