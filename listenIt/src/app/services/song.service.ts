import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { cancion } from '../models/cancion';


@Injectable()
export class SongService{
  public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}


	getSongs(token, Album: string) : Observable<any> {
		let headers = new HttpHeaders()
		.set('Content-Type', 'application/json');

		return this._http.get(this.url+'songs/'+ Album, {headers: headers});
	}


	addSong(cancion) : Observable<any> {
		console.log(cancion);
    	let data = { id: cancion.id, genero: cancion.genero, nombre: cancion.nombre, mp3: cancion.mp3, autor:cancion.autor, album: cancion.album };
		let headers = new HttpHeaders()
		.set('Content-Type', 'application/json');

		return this._http.post(this.url+ 'uploadSong', data, {headers: headers});
	}

}
