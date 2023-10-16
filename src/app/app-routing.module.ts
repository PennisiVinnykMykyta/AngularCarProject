import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarsTableComponent} from "./components/tables/cars-table/cars-table.component";
import {BookingsTableComponent} from "./components/tables/bookings-table/bookings-table.component";
import {UserTableComponent} from "./components/tables/user-table/user-table.component";
import {Roles} from "./components/mock-files/templates/roles";


const routes: Routes = [
  {path: 'yourBookings', component:BookingsTableComponent,data:{roles: [Roles.User,Roles.Admin]}},
  {path: 'yourProfile' , component: UserTableComponent, data:{roles: [Roles.User]}},
  {path: 'allBookings', component:BookingsTableComponent,data:{roles: [Roles.Admin]}},
  {path: 'users', component:UserTableComponent, data:{roles: [Roles.User,Roles.Admin]}},
  {path: 'allCars', component:CarsTableComponent,data:{roles: [Roles.User,Roles.Admin]}},
  {path: 'userBookings/:id', component: BookingsTableComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
