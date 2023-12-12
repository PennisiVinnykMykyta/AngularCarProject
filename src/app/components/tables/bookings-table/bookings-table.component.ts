import {Component, Injectable, OnInit} from '@angular/core';
import {BookingDisplayTemplate} from "../../templates/dto-templates/booking-display-template";
import {BookingsService} from "../../services/bookings.service";
import {ActivatedRoute} from "@angular/router";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {AuthenticationService} from "../../services/authentication.service";
import {BookingsTableConfig} from "./bookings-table.config";
import {Roles} from "../../templates/dto-templates/roles";
import {Observable} from "rxjs";


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


    this.userId = this.authService.getUserId()!;
    this.role = this.authService.getRole()!;

    if(this.bookings === undefined){
      this.setBookings();
    }

    if(this.role === Roles.Admin){
      this.tableConfig = this.bookTableConfig.tableConfigAdmin;
    }else{
      this.tableConfig = this.bookTableConfig.tableConfigUser;
    }


  }

  setBookings(): void{
    let books: Observable<BookingDisplayTemplate[]>;
    let email: string | null = this.route.snapshot.paramMap.get('email');

    if(email !== null){
      books = this.bookingService.getUserBookings(email);
    }else if(this.role === Roles.Admin){
      books = this.bookingService.getAllBookings();
    }else{
      books = this.bookingService.getUserBookings(this.userId);
    }

    books.subscribe(book => {
      this.bookings = book;

    });
    this.formRequest = false;
  }

  clickAction($event: { obj: any; action: any }){
    switch ($event.action.action){
      case MyTableActionEnum.NEW_ROW:
        this.formRequest = true;
        this.book = {} as BookingDisplayTemplate;
        break;
      case MyTableActionEnum.DELETE:
        this.bookingService.deleteBooking($event.obj.id).subscribe(()=>this.setBookings());
        break;
      case MyTableActionEnum.EDIT:
        this.formRequest = true;
        this.book = $event.obj
        break;
      case MyTableActionEnum.APPROVE:
        this.bookingService.acceptBooking($event.obj.id).subscribe(() => this.setBookings());
        break;
      case MyTableActionEnum.DISAPPROVE:
        this.bookingService.declineBooking($event.obj.id).subscribe(() => this.setBookings());
    }
  }

  setRequest($event: boolean) {
    if($event){
      this.setBookings();
    }
  }

}
