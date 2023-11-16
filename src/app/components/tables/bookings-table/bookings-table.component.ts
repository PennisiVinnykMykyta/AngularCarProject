import {Component, Injectable, OnInit} from '@angular/core';
import {BookingDisplayTemplate} from "../../templates/dto-templates/booking-display-template";
import {BookingsService} from "../../services/bookings.service";
import {ActivatedRoute} from "@angular/router";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {AuthenticationService} from "../../services/authentication.service";
import {BookingsTableConfig} from "./bookings-table.config";
import {Roles} from "../../templates/dto-templates/roles";


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements  OnInit{

  user!: any;
  userId!: string;
  role!: string;
  formRequest!: boolean;
  book!: any;
  bookings!: BookingDisplayTemplate[];
  tableConfig!: CustomTableConfig;


  constructor(private bookingService: BookingsService, private bookTableConfig: BookingsTableConfig, private route:ActivatedRoute, private authService: AuthenticationService) {
  }
  ngOnInit() {
    this.userId = this.authService.getUserId()!; //current user
    this.role = this.authService.getRole()!; //current users role
    console.log(this.userId);
    console.log(this.role);

    if(this.bookings === undefined){
      console.log("Books are empty");
      this.bookings = [];
    }

    if(this.role === Roles.Admin){
      this.tableConfig = this.bookTableConfig.tableConfigAdmin;
    }else{
      this.tableConfig = this.bookTableConfig.tableConfigUser;
    }

    this.setBookings();
  }

  setBookings(){

    if(this.role === Roles.Admin){

      this.bookingService.getAllBookings().subscribe(books => {
        this.bookings = books;
        this.formRequest = false;
      });

    }else{

      this.bookingService.getUserBookings(this.userId).subscribe(books => {
        this.bookings = books;
        this.formRequest = false;
      });
    }
  }

  clickAction($event: { obj: any; action: any }){
    switch ($event.action.action){
      case MyTableActionEnum.NEW_ROW:
        console.log("clicked:" + $event.action.text, $event.obj);
        this.formRequest = true;
        this.book = {} as BookingDisplayTemplate;
        break;
      case MyTableActionEnum.DELETE:
        console.log("clicked:" + $event.action.text)
        this.bookingService.deleteBooking($event.obj.id).subscribe(()=>this.setBookings());
        break;
      case MyTableActionEnum.EDIT:
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.book = $event.obj
        break;
      case MyTableActionEnum.APPROVE:
        console.log("clicked:" + $event.action.text)
        this.bookingService.validateOrDecline($event.obj.id).subscribe(() => this.setBookings());
    }
    console.log($event.obj,$event.action)
  }

  setRequest($event: boolean) {
    if($event){
      this.setBookings();
    }
  }

}
