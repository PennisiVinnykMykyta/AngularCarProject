import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
import {UserTableComponent} from "../../tables/user-table/user-table.component";



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;


  @Input() user!: any;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  name?: string = '';
  lastName?: string = '';
  password?: string = '';
  email?: string = '';
  birthday?: string = '';

  constructor(private router: Router, private userService: UserService, private table: UserTableComponent) {
  }
  ngOnInit() {
    console.log(this.user);
    this.initUserInfo(this.user);
  }

  initUserInfo(obj: any){
    if(obj !== null){
      this.name=obj.name;
      this.lastName=obj.lastName;
      this.password = obj.password;
      this.birthday = obj.birthday;
      this.email = obj.email;
    }

  }

  addOrUpdate(obj: any){
    if(obj !== null){
      this.userService.addOrUpdateUser(obj.id)
    }else{
      this.userService.addOrUpdateUser(obj);
    }
}

  clickAction(action:string){
    if(action !== 'back'){
      this.addOrUpdate(this.user)
    }
    this.goBack.emit(true)
  }

}
