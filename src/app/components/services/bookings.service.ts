import { Injectable } from '@angular/core';
import {Bookings} from "../mock-files/mock-bookings";
import {BookingTemplate} from "../mock-files/templates/booking-template";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  //il caso in cui il user non ha alcun booking prenotato, senza il databse è il caso default
  emptyBookings : BookingTemplate[] = []

  constructor(private http: HttpClient) { }

  getAllBookings() : Observable<BookingTemplate[]>{
    return of(Bookings);
  }

  getUserBookings(userId: number) : Observable<BookingTemplate[]>{
    console.log("retrived users bookings" + userId)
    //return all bookings of the userId
    return of(this.emptyBookings);
  }

  deleteBooking(id:number): void{
    console.log("deleted the booking:" + id);
  }

  addOrUpdateBooking(id: number | null): void {
    console.log("added or updated the booking:" + id);
  }

}
