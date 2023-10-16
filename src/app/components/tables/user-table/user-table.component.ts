import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {UserTemplate} from "../../mock-files/templates/user-template";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBook, faCancel, faUserGear, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {BookingsService} from "../../services/bookings.service";
import {Roles} from "../../mock-files/templates/roles";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

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
  adminActions: MyActionEvent[] = [
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
  userActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.EDIT,
      rowAction: true,
      text: "Change User Info",
      icon: faUserGear
    }
  ]

  actions!: MyActionEvent[];

  role!: Roles;

  constructor(private userService:UserService, private bookService:BookingsService, private authService: AuthenticationService,private  router: Router) {
  }
  ngOnInit() {
    this.user = this.authService.getUser();

    if(this.user.role === 'User'){
      console.log('User');
      this.actions = this.userActions;
    }else{
      console.log('Admin');
      this.actions = this.adminActions;
    }


    this.formRequest = false;
    this.setUsers();
    console.log(this.users);

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
      actions: this.actions
    }
  }

  setUsers(){
    if(this.user.role === 'User'){
      return this.users.push(this.user);
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
        void this.router.navigate(['userBookings'],$event.obj)
        break;
    }
  }

  setRequest($event: boolean) {
    if($event){
      this.formRequest = false;
    }
  }
}
