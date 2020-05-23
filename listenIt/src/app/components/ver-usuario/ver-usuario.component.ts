import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {
  public token;
  public status;
  public usuario: usuario;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }
  seguir(){
   /* this._userService.getAlbums(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
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

}
