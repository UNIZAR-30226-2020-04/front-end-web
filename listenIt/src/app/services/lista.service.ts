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
    let lista = JSON.parse(localStorage.getItem('actualLista'));
    if (lista != "undefined") {
        this.lista = lista;
    } else {
        this.lista = null;
    }
    return this.lista;
  }
  
  getListas(token) : Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'songs/'+ token, {headers: headers});
	}

  addLista(token, lista: lista){
    let data = {email: token, name: lista.nombre, date: lista.fecha};
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this._http.post(this.url+ 'createLista', data, {headers: headers});
  }

  deleteLista(token, nombreLista: string){
    let data = {email: token, name: nombreLista};
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

    return this._http.delete(this.url+'Lista/'+ data, {headers: headers});
	}
}