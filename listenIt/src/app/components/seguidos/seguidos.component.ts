import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

  constructor(
    private _userService: UserService,
    private _router: Router,
    ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  /*  this._userService.seguidos(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.seguidos = response;
        }else{						
          this.status = 'error2';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );*/
  }
  local(elemento){
  	localStorage.setItem('elemento', JSON.stringify(elemento));
  }

  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }

}

