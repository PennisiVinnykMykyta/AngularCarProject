import {Roles} from "./roles";
import {BookingTemplate} from "./booking-template";


export interface UserTemplate{

  id: number;
  name?: string;
  lastName?: string;
  password?: string;
  email?: string;
  role?: Roles;
  rents?: BookingTemplate[];
  birthday?: string;


}
