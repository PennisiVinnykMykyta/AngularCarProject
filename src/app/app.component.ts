import {Component} from '@angular/core';
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

  public user?: UserDisplayTemplate;
  public message?: string;
  public  userId!: number;

  constructor(private authService: AuthenticationService, private appConfig: AppConfig) {
  }

  getNavConfig(){
    if(this.user!.userType === Roles.Admin){
      this.appConfig.adminButtons.userId  = this.user?.id;
      this.appConfig.adminButtons.userRole = this.user?.userType;
      return this.appConfig.adminButtons;
    }else{
      this.appConfig.userButtons.userId  = this.user?.id;
      this.appConfig.userButtons.userRole = this.user?.userType;
      return this.appConfig.userButtons;
    }

  }

  setUser($event: UserDisplayTemplate) {
    if($event !== null && $event !== undefined){
      this.user = $event;
      this.userId = this.user.id;
      this.message = "Welcome " + this.user.firstName!+" "+this.user.lastName;
      this.getNavConfig();
    }

    /*
    user1 admin
    //admin@admin.com
    //admin

    user2 customer
    //email
    //pass
    */
  }

  quitSession($event: boolean) {
    if($event){
      this.user = undefined;
      this.authService.logout();
      this.message = undefined;
     // this.userId = undefined;
    }
  }
}
