import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// Datos personales del usuario.
	public identity;
	public url: string;
	public token;
	
	constructor(public _http: HttpClient) { 
		this.url = GLOBAL.url;
	}
	signup(user): Observable<any> {
        let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url + 'loginUser', params, {headers: headers});
	}

	register(user: usuario): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
<<<<<<< HEAD
        return this._http.post(this.url + 'registerUser', params, {headers: headers});
=======
        return this._http.post(this.url + 'registerUser', data, {headers: headers});
>>>>>>> e6b74a7dfc06117df858ff3f6c409fcb7362a08c
	}
	
	update(user: usuario): Observable<any> {
		let params = JSON.stringify(user);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.put(this.url + 'update-user/' + user.correo, params, {headers: headers});
    }
	
	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined") {
			this.identity = identity;
		}
		else {
			this.identity = null;
		}
		return this.identity;
	}
	
	getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }
}
