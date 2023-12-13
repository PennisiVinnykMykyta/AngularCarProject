import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {UserDisplayTemplate} from "../../templates/dto-templates/user-display-template";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {BookingsService} from "../../services/bookings.service";
import {Roles} from "../../templates/dto-templates/roles";
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
  user!: UserDisplayTemplate;
  tableConfig!: CustomTableConfig
  users!: UserDisplayTemplate[];
  role!: string;
  private userId!: string;

  constructor(private userService:UserService,private userTableConfig:UserTableConfig, private bookService:BookingsService, private authService: AuthenticationService,private  router: Router) {
  }
  ngOnInit() {
    this.formRequest = false;
    this.role = this.authService.getRole()!;
    this.userId = this.authService.getUserId()!;

    if(this.role === Roles.Admin){
      this.tableConfig = this.userTableConfig.tableConfigAdmin
      this.tableConfig.addCategoryAction = {
        action: MyTableActionEnum.NEW_CATEGORY,
      }
      this.tableConfig.deleteCategoryAction ={
        action: MyTableActionEnum.DELETE_CATEGORY,
      }
    }else{
      this.tableConfig = this.userTableConfig.tableConfigUser
    }

    if(this.users === undefined){
      this.setUsers();
    }

  }

  setUsers(){
    if(this.role === Roles.User){
      this.userService.getUserByEmail(this.userId).subscribe(user => {
        this.users = [];
        this.users.push(user);

      })

    }else{
      this.userService.getAllUsers().subscribe(users => {
        this.users = users;

      } );
    }
    this.formRequest = false;
  }


  clickAction($event: { obj: any; action: any }) {
    switch ($event.action.action) {
      case MyTableActionEnum.NEW_ROW:
        this.formRequest = true;
        this.user = {userType: Roles.User} as UserDisplayTemplate;
        break;
      case MyTableActionEnum.DELETE:
        this.userService.deleteUser($event.obj.id).subscribe(() => this.setUsers());
        break;
      case MyTableActionEnum.EDIT:
        this.formRequest = true;
        this.user = $event.obj
        break;
      case MyTableActionEnum.UBOOKINGS:
        void this.router.navigate(['userBookings', $event.obj.email])
        break;
      case MyTableActionEnum.NEW_CATEGORY:
        console.log("New Category Added with Name "+ $event.obj)
        //this.userService.addCategory($event.obj).subscribe(() => this.setUsers())
        break;
      case MyTableActionEnum.DELETE_CATEGORY:
        console.log("Category Deleted "+ $event.obj)
        //this.userService.deleteCategory($event.obj).subscribe(() => this.setUsers())

        break;
    }
  }

  setRequest($event: boolean) {
    if($event){
      this.setUsers();
    }
  }
}
