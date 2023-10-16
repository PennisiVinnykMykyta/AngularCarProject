import { Injectable } from '@angular/core';
import {Users} from "../mock-files/mock-users";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //current user while angular is not connected to database
  user = Users[0]; //0 is admin | 1 is user

  getUser(){
    //will return current user info
    return this.user;
  }

  checkUser(id:number){
    //will check if this user is present in the database
  }
  constructor() { }
}
