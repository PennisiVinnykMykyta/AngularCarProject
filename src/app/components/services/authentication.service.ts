import { Injectable } from '@angular/core';
import {UserDisplayTemplate} from "../templates/dto-templates/user-display-template";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserDetailsToSendDto} from "../templates/dto-templates/user-details-to-send-dto";
import {UserRecievedDetailsDto} from "../templates/dto-templates/user-recieved-details-dto";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  authUser(email: string, password: string): Observable<UserRecievedDetailsDto>{
    let authBody: UserDetailsToSendDto = {
      email: email,
      password: password
    }

    return this.http.post<UserRecievedDetailsDto>("http://localhost:8080/api/user/auth", authBody);

  }

  loggedIn(): boolean{
    return !!sessionStorage.getItem('token'); // we use this function to see if the user has the token
  }

  getToken(): string | null{
    return sessionStorage.getItem('token');
}

  getRole(): string{
    let type = sessionStorage.getItem("type");
    if(type !== null)
    {
      return type
    } else{
      return "";
    }
  }

  getUserId(): string | null{
    let id = sessionStorage.getItem("userId");
    return id
  }

 logout(): void{
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    //chiamata al backend
}



  constructor(private http: HttpClient) { }
}
