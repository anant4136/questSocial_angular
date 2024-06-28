import { Component } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';

@Component({
  selector: 'app-sidenavbaradmin',
  templateUrl: './sidenavbaradmin.component.html',
  styleUrl: './sidenavbaradmin.component.css'
})
export class SidenavbaradminComponent {
  constructor(private login:UserloginService){}
  logOut()
  {
    this.login.logOut();
    window.location.reload();
    window.location.href = '/login';
  }
}
