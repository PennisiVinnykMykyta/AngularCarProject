import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements  OnInit{

  constructor(private userService:UserService) {
  }
  ngOnInit() {
  }

  getAllUsers(){
    return this.userService;
  }

}
