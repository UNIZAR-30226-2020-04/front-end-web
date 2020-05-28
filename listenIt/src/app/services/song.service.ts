import { Injectable, ɵConsole } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';


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
		let data = { correo: token, idalbum: JSON.stringify(album), correoalbum: song.idCancion.l_id.u, idcancion: JSON.stringify(song.idCancion.c_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'unlikeSong', data, {headers: headers});
	}

	//Obtener si le has dado like a una cancion
	getLike(token,album,song) : Observable<any> {
		let data = { correo: token, idalbum: JSON.stringify(album),idcancion: JSON.stringify(song)};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ '/checkLike', data, {headers: headers});
	}

	//Obtener las canciones de una lista
	getSongsL(lista) : Observable<any> {
		let data = { user: lista.idRep.u, idalbum: JSON.stringify(lista.idRep.l_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');;
		return this._http.post(this.url+ 'listSongsPlaylist', data, {headers: headers});
	}

	//Obtener las canciones de un álbum
	getSongs(album) : Observable<any> {
		let data = { user: album.idAlbum.u, idalbum: JSON.stringify(album.idAlbum.l_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'listSongsAlbum', data, {headers: headers});
	}

	//Obtener las canciones que te han gustado
	getLikedSongs(token) : Observable<any> {
		let data = { user: token };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'listLikes', data, {headers: headers});
	}

	//Borrar una canción de un álbum
	deleteSong(album,song) : Observable<any> {
		console.log("user:", song.idCancion.l_id.u, "idalbum:", JSON.stringify(album.idAlbum.l_id), "idcancion: ",JSON.stringify(song.idCancion.c_id))
		let data = { user: song.idCancion.l_id.u, idalbum: JSON.stringify(album.idAlbum.l_id), idcancion: JSON.stringify(song.idCancion.c_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'deleteCancion', data, {headers: headers});
	}

	//Borrar una canción de una lista
	deleteSongL(token,lista,song) : Observable<any> {
		let data = { user: token, nombre:"", usercancion: song.idCancion.l_id.u, idplaylist: JSON.stringify(lista.idRep.l_lid) ,idalbum: JSON.stringify(song.idCancion.l_id.l_id), idcancion: JSON.stringify(song.idCancion.c_id) };
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'deleteSongPlaylist', data, {headers: headers});
	}
}
