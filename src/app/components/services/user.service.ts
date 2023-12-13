import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserDisplayTemplate} from "../templates/dto-templates/user-display-template";
import {HttpClient} from "@angular/common/http";
import {EncodedImage} from "../templates/dto-templates/encoded-image";

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

  getUserByEmail(email: string): Observable<UserDisplayTemplate>{
    return this.http.get<UserDisplayTemplate>(`http://localhost:8080/api/user/get/${email}`);
  }

  uploadProfilePic(obj:any,userId:number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/user/profile-pic/upload/${userId}`,obj);
  }

  downloadProfilePic(userId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/user/profile-pic/download/${userId}`);
  }

  addCategory(category : string): Observable<any>{
    return this.http.post(`http://localhost:8080/api/user/category/add`,category)
  }
  deleteCategory(category : string): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/user/category/delete/${category}`)
  }

}
