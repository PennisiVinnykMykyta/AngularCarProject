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

  constructor(private http: HttpClient) { }
}
