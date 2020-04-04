import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public title: string;
  constructor() {
    this.title = 'Inicio de sesión';
   }

  ngOnInit(): void { '[OK] Component: login.'
  }

}

