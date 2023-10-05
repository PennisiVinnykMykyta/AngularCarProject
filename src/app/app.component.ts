import { Component } from '@angular/core';
import {Users} from "./components/mock-files/mock-users";
import {Bookings} from "./components/mock-files/mock-bookings";
import {Cars} from "./components/mock-files/mock-cars";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularProject';


}
