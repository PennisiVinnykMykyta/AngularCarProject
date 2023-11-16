import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {UserDisplayTemplate} from "../templates/dto-templates/user-display-template";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDisplayTemplate[]>{
    return this.http.get<UserDisplayTemplate[]>(`http://localhost:8080/api/user/list`);
  }

  deleteUser(userId:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/user/delete/${userId}`);
  }

  addOrUpdateUser(obj: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/user/add-or-update`,obj);

  }

  getUser(id:number): Observable<UserDisplayTemplate>{
    return this.http.get<UserDisplayTemplate>(`http://localhost:8080/api/user/get/${id}`);
  }

  getUserByEmail(email: string): Observable<UserDisplayTemplate>{
    return this.http.get<UserDisplayTemplate>(`http://localhost:8080/api/user/get/${email}`);
  }

}
