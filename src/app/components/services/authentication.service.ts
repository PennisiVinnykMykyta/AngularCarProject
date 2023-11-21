import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
      return "CUSTOMER";
    }
  }

  getUserId(): string | null{
    return sessionStorage.getItem("userId")
  }

 logout(): void{
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
}



  constructor(private http: HttpClient) { }
}
