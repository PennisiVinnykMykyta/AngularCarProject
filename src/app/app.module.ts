import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { CustomTableComponent } from './components/templates/custom-table/custom-table.component';
import { CustomButtonComponent } from './components/templates/custom-button/custom-button.component';
import {SearchingPipe} from "./components/pipes/searching-pipe";
import {SortingPipe} from "./components/pipes/sorting-pipe";
import {PaginationPipe} from "./components/pipes/pagination-pipe";
import { UserTableComponent } from './components/tables/user-table/user-table.component';
import { CarsTableComponent } from './components/tables/cars-table/cars-table.component';
import { BookingsTableComponent } from './components/tables/bookings-table/bookings-table.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { CarsFormComponent } from './components/forms/cars-form/cars-form.component';
import { BookingsFormComponent } from './components/forms/bookings-form/bookings-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    CustomButtonComponent,
    SortingPipe,
    SearchingPipe,
    PaginationPipe,
    UserTableComponent,
    CarsTableComponent,
    BookingsTableComponent,
    NavigationBarComponent,
    UserFormComponent,
    CarsFormComponent,
    BookingsFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
