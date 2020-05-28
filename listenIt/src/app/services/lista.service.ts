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

  //Sigue una lista
  seguir(token,lista){
    let data = {correo: token, idplaylist: JSON.stringify(lista.idRep.l_id), correoplaylist: lista.idRep.u};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'followPlayList', data, {headers: headers});
  }
  
  //Deja de seguir una lista
  dejarSeguir(token,lista){
    let data = {correo: token, idplaylist: JSON.stringify(lista.idRep.l_id), correoplaylist: lista.idRep.u};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'unfollowPlayList', data, {headers: headers});
	}

  //Comprueba si sigues una lista
  seguido(token,lista){
    let data = {correo: token, idplaylist: JSON.stringify(lista.idRep.l_id)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'checkFollow', data, {headers: headers});
  }

  //Recoge la lista que el componente verLista debe mostrar
  getLista(){
    let lista = JSON.parse(localStorage.getItem('verLista'));
    if (lista != "undefined") {
        this.lista = lista;
    } else {
        this.lista = null;
    }
    return this.lista;
  }
  
  //Lista las listas que un usuario ha creado
  getListas(token) : Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'getPlaylistByUser', JSON.stringify(token), {headers: headers});
  }

  //Lista las listas que un usuario sigue
  getListasBiblio(token) : Observable<any> {
    let data = {user: token };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'listFollows', data , {headers: headers});
  }
  
  //Crea una nueva lista
  createLista(email,titulo,imagen): Observable<any>{
    let data = {user: email, playlist: titulo, image: imagen};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'createPlaylist', data, {headers: headers});
  }

  //Añade una canción a una lista
  addToLista(token,nombre,autor,idA,idP,idC){
    console.log("holi  ",token,nombre,autor,idA,idP,idC);
    let data = {user: token, nombre: nombre, usercancion: autor,idalbum : JSON.stringify(idA),idplaylist: idP,idcancion: JSON.stringify(idC)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'addToPlaylist', data, {headers: headers});
  }

  //Borra una lista
  deleteLista(token, lista: lista){
    let data = {user: token, idplaylist: JSON.stringify(lista.idRep.l_id)};
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+'deletePlaylist', data, {headers: headers});
  }
   
}