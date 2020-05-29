import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-seguidos',
  templateUrl: './seguidos.component.html',
  styleUrls: ['./seguidos.component.css']
})
export class SeguidosComponent implements OnInit {

  public title: string;
  public seguidos;
  public status;
  public token;
  public identity;
  public userPhoto;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    ) { 
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.userPhoto = this.url + this.identity.urlfoto;
  }

  ngOnInit(): void {
    this._userService.seguidos(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.seguidos = response;
          console.log("BIEN",response);
        }else{						
          this.status = 'error2';
          console.log("MAL");
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );
  }
  local(elemento){
  	localStorage.setItem('verUsuario', JSON.stringify(elemento));
  }

  foto(objeto){
    return this.url + objeto.urlfoto;
  }

  localVer() {
    localStorage.setItem("verUsuario",JSON.stringify(this.identity));
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }

}

