import { Injectable } from '@angular/core';
import {BookingDisplayTemplate} from "../templates/dto-templates/booking-display-template";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BookingRequestTemplate} from "../templates/dto-templates/booking-request-template";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  getAllBookings() : Observable<BookingDisplayTemplate[]>{
    return this.http.get<BookingDisplayTemplate[]>(`http://localhost:8080/api/booking/list`);
  }

  getUserBookings(userId: string) : Observable<BookingDisplayTemplate[]>{
    return  this.http.get<BookingDisplayTemplate[]>(`http://localhost:8080/api/booking/list/by-user/${userId}`);
  }

  deleteBooking(id:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/booking/delete/${id}`);
  }

  acceptBooking(bookId: number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/booking/accept`,bookId);
  }

  declineBooking(bookId: number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/booking/decline`,bookId);
  }

  addOrUpdateBooking(book: BookingRequestTemplate): Observable<any> {
    return this.http.post(`http://localhost:8080/api/booking/add-or-update`,book);
  }
  addCategory(category : string): Observable<any>{
    return this.http.post(`http://localhost:8080/api/user/category/add`,category)
  }
  deleteCategory(category : string): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/user/category/delete/${category}`)
  }


}
