import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {BookingsTableComponent} from "./components/tables/bookings-table/bookings-table.component";

const routes: Routes = [
  {path:'navigationBar',  component:NavigationBarComponent}, //create a homepage and then inject NavigationBarComponent into it
  {path: '', redirectTo:'/navigationBar', pathMatch: 'full'},
  {path: 'table/bookings', component:BookingsTableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
