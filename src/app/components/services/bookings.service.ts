import { Injectable } from '@angular/core';
import {Bookings} from "../mock-files/mock-bookings";
import {BookingTemplate} from "../mock-files/templates/booking-template";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  emptyBookings : BookingTemplate[] = []

  constructor() { }

  getAllBookings() : Observable<BookingTemplate[]>{
    return of(Bookings);
  }

  getUserBookings(userId: number) :BookingTemplate[]{
    console.log("retrived users bookings" + userId)
    //return booking of the userId
    return this.emptyBookings;
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
