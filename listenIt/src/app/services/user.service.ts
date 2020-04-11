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
	signup(user: usuario): Observable<any> {
		let data = {email: user.correo, password: user.contrasena};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url + 'loginUser', data, {headers: headers});
	}

	register(user: usuario): Observable<any> {
	let data = {name: user.nombre, surname: " ", username: user.nick, email: user.correo, password: user.contrasena, dateOfBirth: user.nacimiento};
        console.log(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'registerUser', data, {headers: headers});
	}

	update(user: usuario): Observable<any> {
		let params = JSON.stringify(user);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
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
