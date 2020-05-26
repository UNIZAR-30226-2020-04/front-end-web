import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public identity;
 
  constructor(
    private _router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
  }

  localVer() {
    localStorage.setItem("verUsuario",this.identity);
  }

  logout(){
      localStorage.clear();
      this._router.navigate(['/Login']);
  }
}

