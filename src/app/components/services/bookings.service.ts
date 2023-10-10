import { Injectable } from '@angular/core';
import {Bookings} from "../mock-files/mock-bookings";
import {BookingTemplate} from "../mock-files/templates/booking-template";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }

  getAllBookings() : BookingTemplate[]{
    return Bookings;
  }

  getUserBookings(userId: number) : void{
    console.log("retrived users bookings" + userId)
    //return booking where userid is equal to userId
  }

  deleteBooking(id:number): void{

  }

  addBooking(): void {
    //return blank form
  }

  modifyBooking(id: number): void{
    //return form filled with info to modify
  }
}
