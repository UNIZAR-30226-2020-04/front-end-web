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
  
  getAlbum(){
    let album = JSON.parse(localStorage.getItem('actualAlbum'));
    if (album != "undefined") {
        this.album = album;
    } else {
        this.album = null;
    }
    return this.album;
  }

  getAlbums(token : String) : Observable<any> {
    let data = {user: token};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'getAlbumsByUser', data , {headers: headers});
	}

  addAlbum(token, album: album){
    let data = {email: token, name: album.nombre};
    console.log(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+ 'createAlbum', data, {headers: headers});
  }

  deleteAlbum(token, album: album){
    console.log("pido borrar");
    console.log(album);
    console.log(album.idAlbum);
    let data = { user: token, idalbum: JSON.stringify(album.idAlbum.l_id)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+ 'deleteAlbum' , data, {headers: headers});
	}
}