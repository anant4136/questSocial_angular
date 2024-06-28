import { Component,  HostListener } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user:any = {};
  constructor(private login:UserloginService,private router: Router){}
  ngOnInit(): void {
    this.user = this.login.getUser()
  }
  isNavbarReduced = false;

  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isNavbarReduced = scrollPosition > (window.innerHeight * 0.2);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  logOut()
  {
    this.login.logOut();
    window.location.reload();
    window.location.href = '';
  }
  activeLink: string = 'home'; // default to 'home'

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
