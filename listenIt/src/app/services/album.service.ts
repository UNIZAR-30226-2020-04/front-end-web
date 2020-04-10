import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url: string;

  constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

  addAlbum(token, album: album){
    let params = JSON.stringify(album);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', token);

    return this._http.post(this.url+ 'album', params, {headers: headers});
  }

  /*deleteAlbum(token, id: string){
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', token);

		let options = new HttpHeaders({headers: headers});
		return this._http.delete(this.url+'album/'+id, options);
	}*/
}