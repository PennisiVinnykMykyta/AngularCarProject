import {Roles} from "./roles";
import {BookingTemplate} from "./booking-template";


export interface UserTemplate{

  id: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  userType?: Roles;
  birthDate?: string;


}
