import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { album } from '../models/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url: string;
  public album: album;

  constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
  }
  
  //Recoge el álbum que el componente verAlbum debe mostrar
  getAlbum(){
    let album = JSON.parse(localStorage.getItem('verAlbum'));
    if (album != "undefined") {
        this.album = album;
    } else {
        this.album = null;
    }
    return this.album;
  }

  //Lista los álbums de un usuario
  getAlbums(token : String) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'getAlbumsByUser', JSON.stringify(token), {headers: headers});
  }
  
  //Lista los álbums que deben aparecer en la biblioteca de un usuario
  getAlbumsBiblio(token) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'listAlbumsLikes', JSON.stringify(token), {headers: headers});
	}

  //Sube un álbum
  addAlbum(token, album: album, imagen: File) : Observable<any> {
    let data = {email: token, name: album.nombre, image: imagen};
    console.log(data); 
    const formdata: FormData = new FormData();
    formdata.append('email',token);
    formdata.append('name',album.nombre);
    formdata.append('foto',imagen);
    console.log(token + " --- " + album.nombre + " --- " + imagen);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'createAlbum', formdata, {headers: null});
  }

  //Borra un álbum y todas sus canciones
  deleteAlbum(token, album: album){
    let data = { user: token, idalbum: JSON.stringify(album.idAlbum.l_id)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+ 'deleteAlbum' , data, {headers: headers});
	}
}