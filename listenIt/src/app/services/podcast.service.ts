import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { GLOBAL } from './global';
import { podcast } from '../models/podcast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  public url: string;
  public podcast: podcast;

  constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
  }

  //Crea un nuevo podcast
  createPodcast(email,titulo,imagen: File): Observable<any>{
    const formdata: FormData = new FormData();
    formdata.append('email',email);
    formdata.append('podcast',titulo);
    formdata.append('foto',imagen);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'createPodcast',formdata, {headers: null});
  }

  //Sigue un podcast
  seguir(token,podcast){
    let data = {email: token, name: podcast};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'seguirPodcast', data, {headers: headers});
  }
  
  //Deja de seguir un podcast
  dejarSeguir(token,podcast){
    let data = {email: token, name: podcast};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'dejarSeguirPodcast', data, {headers: headers});
	}

  //Comprueba si sigues un podcast o no
  seguido(token,podcast){
    let data = {email: token, name: podcast};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'seguidoPodcast', data, {headers: headers});
  }

  //Recoge el podcast que el componente verPodcast debe mostrar
  getPodcast(){
    let podcast = JSON.parse(localStorage.getItem('verPodcast'));
    if (podcast != "undefined") {
        this.podcast = podcast;
    } else {
        this.podcast = null;
    }
    return this.podcast;
  }

  //Muestra los capítulos que componen el podcast
  getCapitulos(token,podcast) : Observable<any> {
    let data = {user: token, idalbum: podcast.idPodcast.l_id};
    console.log(data);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'listPodcast', data , {headers: headers});
	}
  
  //Muestra los diferentes Podcast que ha subido un usuario
  getPodcasts(token) : Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'getPodcastsByUser', JSON.stringify(token), {headers: headers});
	}

  //Obtiene la lista de podcast que sigue un usuario, que serán los que se muestren en la biblioteca.
  getPodcastsBiblio(token) : Observable<any> {
    let data = {user: token};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+'listSubscriptions',data, {headers: headers});
  }

  addCap(correo,idAlbum,titCancion,file: File): Observable<HttpEvent<{}>> {
    console.log("Subiendo: " + file);
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('idalbum',idAlbum);
    formdata.append('user',correo);
    formdata.append('nombreC',titCancion);
    console.log(idAlbum + " -- " + correo + " -- " + titCancion);
    const req = new HttpRequest('POST', GLOBAL.url + 'subirCapitulo', formdata, {
        reportProgress: true,
        responseType: 'text'
    });
    return this._http.request(req);
   }

  //Borra un capítulo de un podcast
  deleteCap(token, podcast: podcast){
    let data = {user: token, name: podcast.nombre, date: podcast.fecha};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+ 'createPodcast', data, {headers: headers});
  }

  //Borra un podcast y todos sus capítulos
  deletePodcast(token, podcast){
    let data = {user: token, idpodcast: JSON.stringify(podcast)};
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    return this._http.post(this.url+'deletePodcast', data, {headers: headers});
	}
}