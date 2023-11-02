import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {UserTemplate} from "../mock-files/templates/user-template";
import {Users} from "../mock-files/mock-users";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserTemplate[]>{
    return this.http.get<UserTemplate[]>(`http://localhost:8080/api/user/list`);
  }

  deleteUser(userId:number): void{
    this.http.delete(`http://localhost:8080/api/user/delete/${userId}`).subscribe();
    console.log("user deleted: " + userId);
  }

  addOrUpdateUser(obj: any): void {
    this.http.post(`http://localhost:8080/api/user/add-or-update`,obj).subscribe();
    console.log("user added" + obj);
  }

}
