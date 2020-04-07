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
	signup(user, gettoken = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url + 'login', params, {headers: headers});
	}

	register(user: usuario): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params, {headers: headers});
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
