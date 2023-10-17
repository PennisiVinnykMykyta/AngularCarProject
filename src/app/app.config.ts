import {NavigationBarConfig} from "./components/navigation-bar/navigation-bar.config";
import {faBook, faBookAtlas, faCaravan, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppConfig{
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
}
