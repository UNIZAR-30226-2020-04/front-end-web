import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
	public url;

  constructor(private http: HttpClient) {
  	this.url = GLOBAL.url;
  }

  search(tipo,texto): Observable<any> {
  	let data = {s: texto};
  	console.log("Buscando " + tipo + " con texto: " + data.s);
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');

  	if(tipo == "playlist") {
  		return this.http.post(this.url + 'searchPlaylist', texto, {headers: headers});
  	}
  	else if(tipo == "albumes") {
  		return this.http.post(this.url + 'searchAlbum', texto, {headers: headers});
  	}
  	else if(tipo == "podcast") {
  		return this.http.post(this.url + 'searchPodcast', texto, {headers: headers});
  	}
  	else {	// tipo == "artistas"
  		return this.http.post(this.url + 'searchUser', texto, {headers: headers});
  	}
  }

  searchSong(texto): Observable<any> {
	let headers = new HttpHeaders().set('Content-Type', 'application/json');
	return this.http.post(this.url + 'searchSong', texto, {headers: headers});
  }

}