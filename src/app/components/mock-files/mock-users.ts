import {Roles} from "./templates/roles";
import {UserTemplate} from "./templates/user-template";

export const Users: UserTemplate[] = [
  {id: 0, name: 'Mark', lastName: 'Loric', password: '0', email: '0markloric@gmail.com', role: Roles.Admin , birthday: '01-12-1990' },
  {id: 1, name: 'Mark1', lastName: 'Loric1', password: '01', email: '1markloric@gmail.com', role: Roles.User , birthday: '02-11-1991' },
  {id: 2, name: 'Mark2', lastName: 'Loric2', password: '012', email: '2markloric@gmail.com', role: Roles.User , birthday: '03-10-1992' },
  {id: 3, name: 'Mark3', lastName: 'Loric3', password: '0123', email: '3markloric@gmail.com', role: Roles.User , birthday: '04-9-1993' },
  {id: 4, name: 'Mark4', lastName: 'Loric4', password: '01234', email: '4markloric@gmail.com', role: Roles.User , birthday: '05-8-1994' },
  {id: 5, name: 'Mark5', lastName: 'Loric5', password: '012345', email: '5markloric@gmail.com', role: Roles.User , birthday: '06-7-1995' },
]

