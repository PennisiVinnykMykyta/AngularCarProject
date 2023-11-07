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
  users: UserDisplayTemplate[] = [];
  role!: Roles;

  check = false;

  constructor(private userService:UserService,private userTableConfig:UserTableConfig, private bookService:BookingsService, private authService: AuthenticationService,private  router: Router) {
  }
  ngOnInit() {
    this.authService.getUser("admin@admin.com","admin").subscribe(user => {
       this.user = user;
       this.formRequest = false;

       this.setUsers();

       this.check = true;
    })

    //console.log(this.users);

  }

  setUsers(){
    console.log("User Role is:")
    console.log(this.user.userType)
    if(this.user.userType === Roles.User){
      this.users.push(this.user);
      this.tableConfig = this.userTableConfig.tableConfigUser
      //se è un utente nella tabella ci saranno solo le sue informazioni con l'unica opzione di modificare le proprie info
    }else{
      this.userService.getAllUsers().subscribe(users => {
        this.users = users;
        this.tableConfig = this.userTableConfig.tableConfigAdmin
      } );
    }
    this.formRequest = false;
  }


  clickAction($event: { obj: any; action: any }) {
    switch ($event.action.action) {
      case MyTableActionEnum.NEW_ROW:
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.user = {userType: Roles.User} as UserDisplayTemplate;
        break;
      case MyTableActionEnum.DELETE:
        console.log("clicked:" + $event.action.text)
        this.userService.deleteUser($event.obj.id).subscribe(() => this.setUsers());
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
      this.setUsers();
    }
  }
}
