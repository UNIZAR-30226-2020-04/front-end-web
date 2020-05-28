import { Injectable, ɵConsole } from '@angular/core';
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

	//Dar like a una canción 
	like(token,album,song) : Observable<any> {
		let data = { correo: token, idalbum: JSON.stringify(album), correoalbum: JSON.stringify(song.idCancion.l_id.u), idcancion: JSON.stringify(song.idCancion.c_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'likeSong', data, {headers: headers});
	}

	//Quitar el like a una canción 
	unlike(token,album,song) : Observable<any> {
		let data = { correo: token, idalbum: JSON.stringify(album), correoalbum: JSON.stringify(song.idCancion.l_id.u), idcancion: JSON.stringify(song.idCancion.c_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'unlikeSong', data, {headers: headers});
	}

	//Obtener si le has dado like a una cancion de un album
	getLike(token,album,song) : Observable<any> {
		let data = { user: token, idalbum: JSON.stringify(album.idAlbum.l_id),song: song };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'getLike', data, {headers: headers});
	}

	getSongsL(lista) : Observable<any> {
		let data = { user: lista.idRep.u, idalbum: JSON.stringify(lista.idRep.l_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'listSongsLista', data, {headers: headers});
	}

	getSongs(album) : Observable<any> {
		let data = { user: album.idAlbum.u, idalbum: JSON.stringify(album.idAlbum.l_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'listSongsAlbum', data, {headers: headers});
	}

	deleteSong(album,song) : Observable<any> {
		let data = { user: song.idCancion.l_id.u, idalbum: JSON.stringify(album.idAlbum.l_id), idcancion: JSON.stringify(song.idCancion.c_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'deleteCancion', data, {headers: headers});
	}
}
