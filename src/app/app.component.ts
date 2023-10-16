import {Component, OnInit} from '@angular/core';
import {UserService} from "./components/services/user.service";
import {NavigationBarConfig} from "./components/navigation-bar/navigation-bar.config";
import {faBook, faBookAtlas, faCaravan, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Roles} from "./components/mock-files/templates/roles";
import {AuthenticationService} from "./components/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'Welcome User';

  public userRole?: Roles;

  userButtons: NavigationBarConfig =
    {
      buttonsConfig: [
        {
          text: 'View Your Bookings',
          icon: faBook,
          path:'/yourBookings'
        },
        {
          text: 'View Your Profile',
          icon: faUser,
          path:'/yourProfile'
        },
      ]
    }
  adminButtons: NavigationBarConfig =
    {
      buttonsConfig: [
        {
          text: 'View All Cars',
          icon: faCaravan,
          path: '/allCars'
        },
        {
          text: 'View All Bookings',
          icon: faBookAtlas,
          path:'/allBookings'
        },{
          text: 'View All Users',
          icon: faUsers,
          path:'/users'
        }
      ]
    }
  getNavConfig(){
    if(this.userRole === Roles.Admin){
      return this.adminButtons;
    }else{
      return  this.userButtons;
    }
  }

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userRole = this.authService.getUser().role; // User per adesso l'ho settato ad Admin solo per testare
  }

}
