import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {UserTemplate} from "../../mock-files/templates/user-template";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {ActivatedRoute, Router} from "@angular/router";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBook, faCancel, faUserGear, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {BookingsService} from "../../services/bookings.service";
import {AppComponent} from "../../../app.component";
import {Roles} from "../../mock-files/templates/roles";

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
  adminActions!: MyActionEvent[];
  userActions!: MyActionEvent[];

  role!: Roles;

  constructor(private userService:UserService, private bookService:BookingsService, private obj: AppComponent) {
  }
  ngOnInit() {
    this.role = this.obj.userRole;

    if(this.role === 'User'){
      console.log('User');
    }else{
      console.log('Admin');
    }

    this.formRequest = false;
    this.setUsers();
    this.adminActions = [
      {
        action: MyTableActionEnum.NEW_ROW,
        rowAction:false,
        text:"Add User",
        icon: faUserPlus
      },
      {
        action: MyTableActionEnum.DELETE,
        rowAction:true,
        text:"Delete User",
        icon: faCancel
      },
      {
        action: MyTableActionEnum.EDIT,
        rowAction: true,
        text: "Change User Info",
        icon: faUserGear
      },
      {
        action: MyTableActionEnum.UBOOKINGS,
        rowAction: true,
        text: "View User Bookings",
        icon: faBook
      }
    ]

    this.userActions = [
      {
        action: MyTableActionEnum.EDIT,
        rowAction: true,
        text: "Change User Info",
        icon: faUserGear
      }
    ]

    this.tableConfig = {
      headers: [
        {key: "name", label: "First Name"},
        {key: "lastName", label:"Last Name"},
        {key: "email", label:"Email"},
        {key: "birthday", label:"Birthday"}
      ],
      order: {
        orderType: "desc",
        defaultColumn: "desc"
      },
      pagination:{
        itemPerPage: 5,
        itemPerPageOptions:[
          5,
          10
        ]
      },
      actions: this.userActions
    }
  }

  setUsers(){
    if(this.role === 'User'){
      return this.userService.getAllUsers().subscribe(users => this.users = users);
      //return  this.userService.getCurrentUser().subscribe(users:); aggiungere funzione in service per prendere il user corrente
    }else{
      return this.userService.getAllUsers().subscribe(users => this.users = users);
    }
  }

  clickAction($event: { obj: any; action: any }) {
    switch ($event.action.text) {
      case "Add User":
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.user = null;
        break;
      case "Delete User":
        console.log("clicked:" + $event.action.text)
        this.userService.deleteUser($event.obj.id);
        break;
      case "Change User Info":
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.user = $event.obj
        break;
      case "View User Bookings":
        console.log("clicked:" + $event.action.text)
        this.bookService.getUserBookings($event.obj.id);
        break;
    }
  }

  setRequest($event: boolean) {
    if($event){
      this.formRequest = false;
    }
  }
}
