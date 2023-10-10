import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarsTableComponent} from "./components/tables/cars-table/cars-table.component";
import {BookingsTableComponent} from "./components/tables/bookings-table/bookings-table.component";
import {UserTableComponent} from "./components/tables/user-table/user-table.component";
import {Roles} from "./components/mock-files/templates/roles";
import {UserFormComponent} from "./components/forms/user-form/user-form.component";

const routes: Routes = [
  {path: 'availableCars', component:CarsTableComponent, data:{roles: [Roles.User,Roles.Admin]}},
  {path: 'yourBookings', component:BookingsTableComponent,data:{roles: [Roles.User,Roles.Admin]}},
  {path: 'users', component:UserTableComponent, data:{roles: [Roles.User,Roles.Admin]}},
  {path: 'allCars', component:CarsTableComponent},
  {path: 'users/addForm', component:UserFormComponent},
  {path: 'users/modifyForm', component:UserFormComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
