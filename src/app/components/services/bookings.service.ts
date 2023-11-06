import { Injectable } from '@angular/core';
import {BookingDisplayTemplate} from "../mock-files/templates/booking-display-template";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BookingRequestTemplate} from "../mock-files/templates/booking-request-template";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  //il caso in cui il user non ha alcun booking prenotato, senza il databse è il caso default
  emptyBookings : BookingDisplayTemplate[] = []

  constructor(private http: HttpClient) { }

  getAllBookings() : Observable<BookingDisplayTemplate[]>{
    return this.http.get<BookingDisplayTemplate[]>(`http://localhost:8080/api/booking/list`);
  }

  getUserBookings(userId: number) : Observable<BookingDisplayTemplate[]>{
    return  this.http.get<BookingDisplayTemplate[]>(`http://localhost:8080/api/booking/list/by-user/${userId}`);
  }

  deleteBooking(id:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/booking/delete/${id}`);
  }

  validateOrDecline(bookId: number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/booking/accept-or-decline`,bookId);
  }

  addOrUpdateBooking(book: BookingRequestTemplate): Observable<any> {
    return this.http.post(`http://localhost:8080/api/booking/add-or-update`,book);
  }

}
