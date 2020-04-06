import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	// Datos personales del usuario.
	public identity;

  constructor() { }


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
}
