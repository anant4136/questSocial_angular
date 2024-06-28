import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserloginService } from './userlogin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserloginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Your logic for determining if the user is allowed to activate the route goes here
    // Or false based on your logic
    //  console.log(this.userService.isLoggedIn())
    if (typeof localStorage !== 'undefined' && this.userService.isLoggedIn() && this.userService.isUserAdmin() == true) return true;
    this.router.navigate(['login'])
    return false;
  }
}
