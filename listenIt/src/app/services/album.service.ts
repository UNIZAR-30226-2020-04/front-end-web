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

  getAlbums(token) : Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'songs/'+ token, {headers: headers});
	}

  addAlbum(token, album: album){
    let data = {email: token, name: album.nombre, date: album.fecha};
    console.log(data);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this._http.post(this.url+ 'createAlbum', data, {headers: headers});
  }

  deleteAlbum(token, nombreAlbum: string){
    let data = {email: token, name: nombreAlbum};
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

    return this._http.delete(this.url+'Album/'+ data, {headers: headers});
	}
}