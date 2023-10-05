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
}
