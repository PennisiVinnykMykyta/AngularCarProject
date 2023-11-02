import {Component, OnInit} from '@angular/core';
import {UserService} from "./components/services/user.service";
import {NavigationBarConfig} from "./components/navigation-bar/navigation-bar.config";
import {faBook, faBookAtlas, faCaravan, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Roles} from "./components/mock-files/templates/roles";
import {AuthenticationService} from "./components/services/authentication.service";
import {AppConfig} from "./app.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'Welcome User';

  public userRole?: Roles;

  constructor(private authService: AuthenticationService, private appConfig: AppConfig) {
  }

  getNavConfig(){
    if(this.userRole === Roles.Admin){
      return this.appConfig.adminButtons;
    }else{
      return this.appConfig.userButtons;
    }
  }

  ngOnInit() {
    this.authService.getUser('admin').subscribe(user => this.userRole = user.userType) // User per adesso l'ho settato ad Admin solo per testare
  }

}
