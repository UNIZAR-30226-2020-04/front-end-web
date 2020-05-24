import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { lista } from '../models/lista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public url: string;
  public lista;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  seguir(token,lista){
    let data = {email: token, name: lista};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'seguirLista', data, {headers: headers});
  }
  
  dejarSeguir(token,lista){
    let data = {email: token, name: lista};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'dejarSeguirLista', data, {headers: headers});
	}

  seguido(token,lista){
    let data = {email: token, name: lista};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'seguidaLista', data, {headers: headers});
  }

  getLista(){
    let lista = JSON.parse(localStorage.getItem('elemento'));
    if (lista != "undefined") {
        this.lista = lista;
    } else {
        this.lista = null;
    }
    return this.lista;
  }
  
  getListas(token) : Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'getPlaylistByUser', JSON.stringify(token), {headers: headers});
  }

  getListasBiblio(token) : Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'getPlaylistBiblio', JSON.stringify(token), {headers: headers});
  }
  
  createLista(email,titulo): Observable<any>{
    let data = {user: email, playlist: titulo};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'createPlaylist', data, {headers: headers});
  }

  addToLista(token,nombre,autor,idA,idP,idC){
    console.log("holi  ",token,nombre,autor,idA,idP,idC);
    let data = {user: token, nombre: nombre, usercancion: autor,idalbum : JSON.stringify(idA),idplaylist: idP,idcancion: JSON.stringify(idC)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'addToPlaylist', data, {headers: headers});
  }

  deleteLista(token, lista: lista){
    let data = {user: token, idplaylist: JSON.stringify(lista.idRep.l_id)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+'deletePlaylist', data, {headers: headers});
  }
  
}