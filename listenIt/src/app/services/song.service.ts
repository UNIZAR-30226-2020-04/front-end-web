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


	getSong(token, id: string){
		let headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Authorization', token);

		return this._http.get(this.url+'cancion/'+id, {headers: headers})
	}

	addSong(cancion) : Observable<any> {
		console.log(cancion);
    	let params = JSON.stringify(cancion);
		let headers = new HttpHeaders()
		.set('Content-Type', 'application/json');

		return this._http.post(this.url+ 'uploadSong', params, {headers: headers});
	}
	  

}
