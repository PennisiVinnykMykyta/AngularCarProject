import { Injectable } from '@angular/core';
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
    return this.http.get<BookingTemplate[]>(`http://localhost:8080/api/booking/list`);
  }

  getUserBookings(userId: number) : Observable<BookingTemplate[]>{
    return  this.http.get<BookingTemplate[]>(`http://localhost:8080/api/booking/list/by-user/${userId}`);
  }

  deleteBooking(id:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/booking/delete/${id}`);
  }

  validateOrDecline(bookId: number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/booking/accept-or-decline`,bookId);
  }

  addOrUpdateBooking(book: BookingTemplate): Observable<any> {
    return this.http.post(`http://localhost:8080/api/booking/add-or-update-book`,book);
  }

}
