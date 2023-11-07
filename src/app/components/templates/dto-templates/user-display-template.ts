import {Roles} from "./roles";


export interface UserDisplayTemplate {

  id: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  userType?: Roles;
  birthDate?: string;

}
