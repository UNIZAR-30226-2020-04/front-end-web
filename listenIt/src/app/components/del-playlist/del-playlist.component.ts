import { Component, OnInit } from '@angular/core';
import { ListaService } from '../../services/lista.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { lista } from '../../models/lista';

@Component({
  selector: 'app-del-lista',
  templateUrl: './del-playlist.component.html',
  styleUrls: ['./del-playlist.component.css']
})
export class DelPlaylistComponent implements OnInit {

  public title: string;
  public selected:Array<number>;
  public selectedLista: lista[];
  public status;
  public token;
  public listas: lista[];

  constructor(
    private _userService: UserService,
    private _listaService: ListaService,
    private _router: Router,
    ) { 
    this.listas=[]
    this.title= "Borrar playlist"
    this.token = this._userService.getToken();
    this.selected= new Array<number>();
    this.selectedLista=[];
  }

  ngOnInit(): void {
    this._listaService.getListas(this.token).subscribe(
      response => {
        if(response != null){
          this.status = 'succes';
          this.listas = response;
        }else{						
          this.status = 'error2';
        }
      },
      error => {
        console.log(<any> error);
          this.status = 'error2';
      }	
    );
  }
   num(lista: lista): number{
    return this.listas.indexOf( lista );
  }

  addSelected(lista: lista){
    var i = this.listas.indexOf( lista );
    if (this.selected[i] != 0){
      this.selectedLista.push(lista);
      this.selected[i]= 0;
    }    
  }
  quitSelected(lista: lista){
    var i = this.selectedLista.indexOf( lista );
    var j = this.listas.indexOf( lista );
    if (this.selected[j] == 0){
      this.selectedLista.splice( i, 1 );
      this.selected[j]= 1;
    }
  }

  deleteLista(){
    this.selectedLista.forEach(element => {
      this._listaService.deleteLista(this.token, element).subscribe(
        response => {
          if(response){
            this.status = 'success';
            this.selectedLista = [];
            this.selected = [];
            this.ngOnInit();
            //this._router.navigate(['/verLista']);
          }else{						
            this.status = 'error';
          }
        },
        error => {
          console.log(<any> error);
            this.status = 'error';
        }	
      );
    });
  }


}

