import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {UserTemplate} from "../../mock-files/templates/user-template";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {Router} from "@angular/router";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBook, faCancel, faUserGear, faUserPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements  OnInit{

  tableConfig!: CustomTableConfig
  //headers!: MyHeaders[];
  users: UserTemplate[] = [];
  //pagination!: MyPagination;
  //role!: Roles;
  userActions!: MyActionEvent[];


  constructor(private userService:UserService, private router: Router) {
  }
  ngOnInit() {
    this.setUsers();
    this.userActions = [
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
    return this.userService.getAllUsers().subscribe(users => this.users = users);
  }


}
