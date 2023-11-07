import {Component, OnInit} from '@angular/core';
import {UserService} from "./components/services/user.service";
import {NavigationBarConfig} from "./components/navigation-bar/navigation-bar.config";
import {faBook, faBookAtlas, faCaravan, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Roles} from "./components/templates/dto-templates/roles";
import {AuthenticationService} from "./components/services/authentication.service";
import {AppConfig} from "./app.config";
import {UserDisplayTemplate} from "./components/templates/dto-templates/user-display-template";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'Welcome User';

  public user?: UserDisplayTemplate;

  constructor(private authService: AuthenticationService, private appConfig: AppConfig) {
  }

  getNavConfig(){
    if(this.user!.userType === Roles.Admin){
      console.log(this.user!.userType);
      return this.appConfig.adminButtons;
    }else{
      console.log(this.user!.userType);
      return this.appConfig.userButtons;
    }

  }

  ngOnInit() {

  }


  setUser($event: UserDisplayTemplate) {
    if($event !== null && $event !== undefined){
      this.user = $event;
      this.getNavConfig();
    }

    //admin@admin.com
    //admin

    //email
    //pass

  }
}
