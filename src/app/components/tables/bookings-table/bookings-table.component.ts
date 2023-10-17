import {Component, Injectable, OnInit} from '@angular/core';
import {BookingTemplate} from "../../mock-files/templates/booking-template";
import {BookingsService} from "../../services/bookings.service";
import {ActivatedRoute} from "@angular/router";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {AuthenticationService} from "../../services/authentication.service";
import {BookingsTableConfig} from "./bookings-table.config";


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
  formRequest!: boolean;
  book!: any;
  bookings!: BookingTemplate[];
  tableConfig!: CustomTableConfig;


  constructor(private bookingService: BookingsService, private bookTableConfig: BookingsTableConfig, private route:ActivatedRoute, private authService: AuthenticationService) {
  }
  ngOnInit() {

    this.formRequest = false;
    this.authService.getUser('user').subscribe(user => this.user = user)
    this.setBookings();


    if(this.user.role === 'Admin'){
      this.tableConfig = this.bookTableConfig.tableConfigAdmin;
    }else{
      this.tableConfig = this.bookTableConfig.tableConfigUser;
    }

  }

  setBookings(){

    if(this.user.role === 'Admin'){

      if(this.route.snapshot.paramMap.get('id') !== null){
        let id: number = +this.route.snapshot.paramMap.get('id')!;
        console.log(id);

        return this.bookingService.getUserBookings(id).subscribe(books => this.bookings = books)
      }else{
        return this.bookingService.getAllBookings().subscribe(books => this.bookings = books);
      }

    }else{
      return this.bookingService.getUserBookings(this.user.id).subscribe(books =>this.bookings = books);
    }
  }

  clickAction($event: { obj: any; action: any }){
    switch ($event.action.action){
      case MyTableActionEnum.NEW_ROW:
        console.log("clicked:" + $event.action.text, $event.obj);
        this.formRequest = true;
        this.book = null;
        break;
      case MyTableActionEnum.DELETE:
        console.log("clicked:" + $event.action.text)
        this.bookingService.deleteBooking($event.obj.id);
        break;
      case MyTableActionEnum.EDIT:
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.book = $event.obj
        break;
      case MyTableActionEnum.APPROVE:
        console.log("clicked:" + $event.action.text)
        this.book.approval = !this.book.approval
    }
    console.log($event.obj,$event.action)
  }

  setRequest($event: boolean) {
    if($event){
      this.formRequest = false;
    }
  }

}
