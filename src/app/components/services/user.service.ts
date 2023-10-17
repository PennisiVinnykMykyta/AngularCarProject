import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {UserTemplate} from "../mock-files/templates/user-template";
import {Users} from "../mock-files/mock-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(): Observable<UserTemplate[]>{
    return of(Users);
  }

  deleteUser(id:number): void{
    console.log("user deleted" + id);
  }

  addOrUpdateUser(id:number | null): void {
    console.log("user added" + id);
  }

}
