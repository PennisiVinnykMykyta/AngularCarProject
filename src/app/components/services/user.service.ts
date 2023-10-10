import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {UserTemplate} from "../mock-files/templates/user-template";
import {Users} from "../mock-files/mock-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(): Observable<UserTemplate[]>{
    const users = of(Users);
    return users;
  }

  deleteUser(id:number): void{
    console.log("user deleted");
  }

  addUser(): void {
    console.log("user add form");
  }

  modifyUser(id: number): void{
    console.log("user modify form: " + id);
  }

}
