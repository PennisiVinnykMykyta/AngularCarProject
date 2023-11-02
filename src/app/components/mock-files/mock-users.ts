import {Roles} from "./templates/roles";
import {UserTemplate} from "./templates/user-template";

export const Users: UserTemplate[] = [
  {id: 0, firstName: 'Mark', lastName: 'Loric', password: '0', email: '0markloric@gmail.com', userType: Roles.Admin , birthDate: '01-12-1990' },
  {id: 1, firstName: 'Mark1', lastName: 'Loric1', password: '01', email: '1markloric@gmail.com', userType: Roles.User , birthDate: '02-11-1991' },
  {id: 2, firstName: 'Mark2', lastName: 'Loric2', password: '012', email: '2markloric@gmail.com', userType: Roles.User , birthDate: '03-10-1992' },
  {id: 3, firstName: 'Mark3', lastName: 'Loric3', password: '0123', email: '3markloric@gmail.com', userType: Roles.User , birthDate: '04-9-1993' },
  {id: 4, firstName: 'Mark4', lastName: 'Loric4', password: '01234', email: '4markloric@gmail.com', userType: Roles.User , birthDate: '05-8-1994' },
  {id: 5, firstName: 'Mark5', lastName: 'Loric5', password: '012345', email: '5markloric@gmail.com', userType: Roles.User , birthDate: '06-7-1995' },
]

