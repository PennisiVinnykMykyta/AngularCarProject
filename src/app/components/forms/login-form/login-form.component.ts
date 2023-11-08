import {Component, EventEmitter, Output} from '@angular/core';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {UserDisplayTemplate} from "../../templates/dto-templates/user-display-template";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email?: string;
  password?: string;
  message?: string;

  @Output() userData: EventEmitter<UserDisplayTemplate> = new EventEmitter<UserDisplayTemplate>();


  constructor(private authService: AuthenticationService) {
  }


  protected readonly faCheck = faCheck;

  verify() {
    this.authService.verifyUser(this.email!,this.password!).subscribe(user => {

      if(user!==null && user !== undefined){
        this.userData.emit(user);
        //localStorage.setItem('JWT',user.token);

      }else{
        this.email = '';
        this.password = '';
        this.message = "No such user in the database";
      }
    });
  }
}
