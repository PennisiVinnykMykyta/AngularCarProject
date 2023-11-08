import { Injectable } from '@angular/core';
import {UserDisplayTemplate} from "../templates/dto-templates/user-display-template";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  verifyUser(email: string, password: string): Observable<UserDisplayTemplate>{ //will eventually take email and password and check them in database
    //will return current user info
    return this.http.get<UserDisplayTemplate>(`http://localhost:8080/api/user/verify/${email},${password}`);
  }

  loggedIn(){
    return !!sessionStorage.getItem('JWT'); // we use this function to see if the user has the token
  }

  getToken(){
    return sessionStorage.getItem('JWT');
}

  getRole(){
    let type = sessionStorage.getItem("type");
    if(type !== null)
    {
      return type
    } else{
      return "";
    }
  }

  getUserId(){
    let id = sessionStorage.getItem("userId");
    if(id !== null)
    {
      return  Number(id);
    } else{
      return id;
    }
  }

 logout(){
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("JWT");
    //chiamata al backend
}



  constructor(private http: HttpClient) { }
}
