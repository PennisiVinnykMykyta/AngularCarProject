import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {UserTemplate} from "../../mock-files/templates/user-template";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {BookingsService} from "../../services/bookings.service";
import {Roles} from "../../mock-files/templates/roles";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserTableConfig} from "./user-tableConfig";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class UserTableComponent implements  OnInit{

  formRequest!: boolean;
  user!: any;
  tableConfig!: CustomTableConfig
  users: UserTemplate[] = [];
  role!: Roles;

  constructor(private userService:UserService,private userTableConfig:UserTableConfig, private bookService:BookingsService, private authService: AuthenticationService,private  router: Router) {
  }
  ngOnInit() {
    this.authService.getUser('user').subscribe(user => this.user = user);

    if(this.user.role === 'User'){
      console.log('User');
      this.tableConfig = this.userTableConfig.tableConfigUser
    }else{
      console.log('Admin');
      this.tableConfig = this.userTableConfig.tableConfigAdmin
    }

    this.formRequest = false;
    this.setUsers();
    console.log(this.users);

  }

  setUsers(){
    if(this.user.role === 'User'){
      return this.users.push(this.user);
      //se è un utente nella tabella ci saranno solo le sue informazioni con l'unica opzione di modificare le proprie info
    }else{
      return this.userService.getAllUsers().subscribe(users => this.users = users);
    }
  }

  clickAction($event: { obj: any; action: any }) {
    switch ($event.action.action) {
      case MyTableActionEnum.NEW_ROW:
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.user = null;
        break;
      case MyTableActionEnum.DELETE:
        console.log("clicked:" + $event.action.text)
        this.userService.deleteUser($event.obj.id);
        break;
      case MyTableActionEnum.EDIT:
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.user = $event.obj
        break;
      case MyTableActionEnum.UBOOKINGS:
        console.log("clicked:" + $event.action.text)
        this.bookService.getUserBookings($event.obj.id);
        void this.router.navigate(['userBookings', $event.obj.id])
        break;
    }
  }

  setRequest($event: boolean) {
    if($event){
      this.formRequest = false;
    }
  }
}
