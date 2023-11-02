import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
import {UserTemplate} from "../../mock-files/templates/user-template";
import {Roles} from "../../mock-files/templates/roles";


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

  newUser: UserTemplate = {} as UserTemplate;

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    console.log(this.user);
    this.initUserInfo(this.user);
  }

  initUserInfo(obj: any){
    if(obj !== null){
      this.name=obj.firstName;
      this.lastName=obj.lastName;
      this.password = obj.password;
      this.birthday = obj.birthDate;
      this.email = obj.email;
    }

  }

  addOrUpdate(obj: any){
    if(obj !== null){
      this.userService.addOrUpdateUser(obj)
    }else{
      this.userService.addOrUpdateUser(obj);
    }
}

  clickAction(action?:string){
    event!.preventDefault();
    if(action !== 'back'){
      if(this.user === null){ //test
        this.newUser.firstName = "this.name";
        this.newUser.lastName = "this.lastName";
        this.newUser.email = "this.email";
        this.newUser.birthDate = "2000-02-02";
        this.newUser.password = "this.password";
        this.newUser.userType= Roles.User;

      }
      console.log(this.newUser);
      this.addOrUpdate(this.newUser)
    }
    this.goBack.emit(true)
  }

}
