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

	seguir(user: usuario): Observable<any> {
		let data = {email: user.correo, password: user.contrasena};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'suscribeUser', data, {headers: headers});
	}

	signup(user: usuario): Observable<any> {
		let data = {email: user.correo, password: user.contrasena};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'loginUser', data, {headers: headers});
	}

	register(user: usuario): Observable<any> {
		let data = {name: user.nombre, surname: " ", username: user.nick, email: user.correo, password: user.contrasena, dateOfBirth: user.nacimiento};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'registerUser', data, {headers: headers});
	}

	changeName(email,name,newName): Observable<any> {
		let data = {user: email, name: name, newName: newName};
		console.log(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarNombre', data, {headers: headers});
	}

	changeNick(email,nick,newNick): Observable<any> {
		let data = {user: email, nick: nick, newNick: newNick};
		console.log(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarNick', data, {headers: headers});
	}

	changePass(email,pass,newPass): Observable<any> {
		let data = {user: email, pass: pass, newPass: newPass};
		console.log(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarPass', data, {headers: headers});
	}

    deleteAccount(emailD,passA,passB): Observable<any> {
    	let data = {email: emailD, pass: passA, confPass: passB};
    	console.log(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'deleteUser', data, {headers: headers});
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
