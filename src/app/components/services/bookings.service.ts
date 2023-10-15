import { Injectable } from '@angular/core';
import {Bookings} from "../mock-files/mock-bookings";
import {BookingTemplate} from "../mock-files/templates/booking-template";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }

  getAllBookings() : Observable<BookingTemplate[]>{
    return of(Bookings);
  }

  getUserBookings(userId: number) : void{
    console.log("retrived users bookings" + userId)
    //return booking where userid is equal to userId
  }

  deleteBooking(id:number): void{

  }

  addOrUpdateBooking(id: number | null): void {
    //return blank form
  }

  modifyBooking(id: number): void{
    //return form filled with info to modify
  }
}
