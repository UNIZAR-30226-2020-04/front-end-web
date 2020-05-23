import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { cancion } from '../models/cancion';
import { album } from '../models/album';
import { idAlbum } from '../models/album';
import { lista } from '../models/lista';


@Injectable()
export class SongService{
  public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}
	getSongsL(lista: lista) : Observable<any> {
		let data = { user: lista.idRep.u, idalbum: JSON.stringify(lista.idRep.l_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'listSongsAlbum', data, {headers: headers});
	}

	getSongs(album: album) : Observable<any> {
		let data = { user: album.idAlbum.u, idalbum: JSON.stringify(album.idAlbum.l_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'listSongsAlbum', data, {headers: headers});
	}

	addSong(cancion) : Observable<any> {
    	let data = { id: cancion.id, genero: cancion.genero, nombre: cancion.nombre, mp3: cancion.mp3, autor:cancion.autor, album: cancion.album };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+ 'uploadSong', data, {headers: headers});
	}

}
