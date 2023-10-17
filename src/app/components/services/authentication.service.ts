import { Injectable } from '@angular/core';
import {Users} from "../mock-files/mock-users";
import {UserTemplate} from "../mock-files/templates/user-template";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //current user while angular is not connected to database
  user = Users[1]; //0 is admin | 1 is user
  admin: UserTemplate = Users[0];

  getUser(str: string): Observable<UserTemplate>{ //will eventually take email and password and check them in database
    //will return current user info
    if(str === 'user'){
      return of(this.user);
    }else{
      return of(this.admin);
    }
  }

  constructor() { }
}
