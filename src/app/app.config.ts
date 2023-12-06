import {NavigationBarConfig} from "./components/navigation-bar/navigation-bar.config";
import {faBook, faBookAtlas, faCaravan, faDoorOpen, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppConfig{
  userButtons: NavigationBarConfig =
    {
      buttonsConfig: [
        {
          customCssClass:"btn btn-secondary",
          text: 'View Your Bookings',
          icon: faBook,
          path:'/yourBookings'
        },
        {
          customCssClass:"btn btn-secondary",
          text: 'View Your Profile',
          icon: faUser,
          path:'/yourProfile'
        },
        {
          customCssClass:"btn btn-primary",
          path:'/',
          text: 'Log out',
          icon:faDoorOpen,
        }
      ],
    }
  adminButtons: NavigationBarConfig =
    {
      buttonsConfig: [
        {
          customCssClass:"btn btn-secondary",
          text: 'View All Cars',
          icon: faCaravan,
          path: '/allCars'
        },
        {
          customCssClass:"btn btn-secondary",
          text: 'View All Bookings',
          icon: faBookAtlas,
          path:'/allBookings'
        },{
          customCssClass:"btn btn-secondary",
          text: 'View All Users',
          icon: faUsers,
          path:'/users'
        },
        {
          customCssClass:"btn btn-primary",
          path:'/',
          text: 'Log out',
          icon:faDoorOpen,
        }
      ]
    }
}
