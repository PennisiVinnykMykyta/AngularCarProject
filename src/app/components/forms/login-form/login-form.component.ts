import {Component, EventEmitter, Output} from '@angular/core';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {UserDisplayTemplate} from "../../templates/dto-templates/user-display-template";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email?: string;
  password?: string;

  @Output() userData: EventEmitter<UserDisplayTemplate> = new EventEmitter<UserDisplayTemplate>();


  constructor(private authService: AuthenticationService, private userService:UserService) {
  }


  protected readonly faCheck = faCheck;

  verify() {

    if((this.email !== "" && this.email !== undefined) && (this.password !== "" && this.password !== undefined)){
      this.authService.authUser(this.email!,this.password!).subscribe(info => {
        if(info !== null && info!==undefined){

          sessionStorage.setItem("token", info.token!);
          sessionStorage.setItem("type",info.userType!);

          this.userService.getUserByEmail(this.email!).subscribe(user =>{
            if(user !== null && user!==undefined){
              sessionStorage.setItem('userId',String(user.email));
              this.userData.emit(user);
            }
          });
        }

      });
    }
  }
}
