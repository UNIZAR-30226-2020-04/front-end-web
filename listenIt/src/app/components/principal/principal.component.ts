import { Component, OnInit } from '@angular/core';
import { album } from 'src/app/models/album';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public album;
  

  
  constructor() {
    this.album= new album("","","Entre poetas y presos","","La Raíz");
  }
  ngOnInit(): void {
  }

}
