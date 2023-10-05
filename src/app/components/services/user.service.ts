import { Injectable } from '@angular/core';
import {UserTemplate} from "../mock-files/templates/user-template";
import {Users} from "../mock-files/mock-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(): UserTemplate[]{
    return Users;
  }
}
