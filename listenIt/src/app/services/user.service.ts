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
	public usuario;
	
	constructor(public _http: HttpClient) { 
		this.url = GLOBAL.url;
	}

	getUsuario(){
		let usuario = JSON.parse(localStorage.getItem('verUsuario'));
		if (usuario != "undefined") {
			this.usuario = usuario;
		} else {
			this.usuario = null;
		}
		return this.usuario;
	  }

<<<<<<< HEAD


=======
	//Sigue a un usuario
>>>>>>> 5fdbd2b65920f48ae3a82db5b5aeb97f05dd34ba
	seguir(token,user): Observable<any> {
		let data = {sessionUser: token, targetUser: user};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'followUser', data, {headers: headers});
	}

	//Deja de seguir a un usuario
	dejarSeguir(token,user): Observable<any> {
		let data = {sessionUser: token, targetUser: user};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'unfollowUser', data, {headers: headers});
	}

	//Comprueba si sigues a un usuario
	seguido(token,user){
		let data = {sessionUser: token, targetUser: user};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+ 'checkFollowedUsers', data, {headers: headers});
	}

	//Obtiene la lista de usuarios seguidos
	seguidos(token){
		let data = {user: token};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'listFollowedUsers', data, {headers: headers});
	}

	//Obtiene la lista de usuarios que aparecerán en la biblioteca
	getUserBiblio(token){
		let data = {user: token};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'listUsersLikes', data, {headers: headers});
	}

	//Hace log in de un usuario
	signup(user: usuario): Observable<any> {
		let data = {email: user.correo, password: user.contrasena};
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + 'loginUser', data, {headers: headers});
	}

	//Registra un nuevo usuario
	register(user: usuario): Observable<any> {
		//let data = {name: user.nombre, surname: " ", username: user.nick, email: user.correo, password: user.contrasena, dateOfBirth: user.nacimiento};
		const formdata: FormData = new FormData();
		formdata.append('name', user.nombre);
		formdata.append('surname'," ");
		formdata.append('username',user.nick);
		formdata.append('email',user.correo);
		formdata.append('password',user.contrasena);
		formdata.append('dateOfBirth',user.nacimiento);
		formdata.append('foto',user.foto);
		let data = {name: user.nombre, surname: " ", username: user.nick, foto: user.foto, email: user.correo, password: user.contrasena, dateOfBirth: user.nacimiento};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'registerUser', formdata, {headers: null});
	}

	//Cambia el nombre de un usuario
	changeName(email,name,newName): Observable<any> {
		let data = {user: email, name: name, newName: newName};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarNombre', data, {headers: headers});
	}

	//Cambia el nick de un usuario
	changeNick(email,nick,newNick): Observable<any> {
		let data = {user: email, nick: nick, newNick: newNick};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarNick', data, {headers: headers});
	}

	//Cambia la foto de perfil de un usuario
	changePhoto(email,photo): Observable<any> {
		let data = {user: email, foto: photo};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarFoto', data, {headers: headers});
	}

	//Cambia la contraseña de un usuario
	changePass(email,pass,newPass): Observable<any> {
		let data = {user: email, pass: pass, newPass: newPass};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'cambiarPass', data, {headers: headers});
	}

	//Elimina un usuario
    deleteAccount(emailD,passA,passB): Observable<any> {
    	let data = {email: emailD, pass: passA, confPass: passB};
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'deleteUser', data, {headers: headers});
	}
	
	//Recoge el usuario que está conectado actualmente
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

	//Recoge el correo del usuario que está conectado actualmente
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
