import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  userType: string[] = new Array(0); //to store roles

  constructor(private authService:AuthenticationService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    let type: string = this.authService.getRole();
    this.userType.push(type);

    if(!this.authService.loggedIn()){
      void this.router.navigate(['/']); //if user is not logged in we redirect to the homepage
      return false;

    }else{
      //based on how many roles we have we can see if everyone or a specific userType can access the page
      return true;
    }

  }
}
