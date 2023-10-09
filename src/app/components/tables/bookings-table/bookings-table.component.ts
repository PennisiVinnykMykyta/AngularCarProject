import {Component, OnInit} from '@angular/core';
import {BookingTemplate} from "../../mock-files/templates/booking-template";
import {BookingsService} from "../../services/bookings.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements  OnInit{

  bookings!: BookingTemplate[];

  constructor(private bookingService: BookingsService,private router:Router) {
  }
  ngOnInit() {
  }

  getAllBookings(){
    return  this.bookingService.getAllBookings();
  }

  clickAction(str: string){
    if(str === 'return'){
      void this.router.navigate(['/navigationBar'])
    }
  }

}