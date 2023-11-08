import {Component, OnInit} from '@angular/core';
import {Roles} from "./components/templates/dto-templates/roles";
import {AuthenticationService} from "./components/services/authentication.service";
import {AppConfig} from "./app.config";
import {UserDisplayTemplate} from "./components/templates/dto-templates/user-display-template";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Welcome User';

  public user?: UserDisplayTemplate;

  constructor(private authService: AuthenticationService, private appConfig: AppConfig) {
  }

  getNavConfig(){
    if(this.user!.userType === Roles.Admin){
      return this.appConfig.adminButtons;
    }else{
      return this.appConfig.userButtons;
    }

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

  quitSession($event: boolean) {
    if($event){
      this.user = undefined;
    }
  }
}
