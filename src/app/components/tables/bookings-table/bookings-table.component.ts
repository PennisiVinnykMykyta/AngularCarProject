import {Component, Injectable, OnInit} from '@angular/core';
import {BookingTemplate} from "../../mock-files/templates/booking-template";
import {BookingsService} from "../../services/bookings.service";
import {ActivatedRoute} from "@angular/router";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {AuthenticationService} from "../../services/authentication.service";
import {BookingsTableConfig} from "./bookings-table.config";
import {Roles} from "../../mock-files/templates/roles";


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
    this.authService.getUser('admin').subscribe(user => this.user = user)
    console.log(this.user.userType);
    this.setBookings();
    console.log(this.bookings);
    if(this.bookings === undefined){
      console.log("Books are empty");
      this.bookings = [];
    }


    if(this.user.userType === Roles.Admin){
      this.tableConfig = this.bookTableConfig.tableConfigAdmin;
    }else{
      this.tableConfig = this.bookTableConfig.tableConfigUser;
    }

  }

  setBookings(){

    if(this.user.userType === Roles.Admin){

      if(this.route.snapshot.paramMap.get('id') !== null){
        let id: number = +this.route.snapshot.paramMap.get('id')!;
        console.log(id);

        this.bookingService.getUserBookings(id).subscribe(books => {
          this.bookings = books;
          this.formRequest = false;
        })
      }else{
        this.bookingService.getAllBookings().subscribe(books => {
          this.bookings = books;
          this.formRequest = false;
        });
      }

    }else{

      this.bookingService.getUserBookings(this.user.id).subscribe(books => {
        this.bookings = books;
        this.formRequest = false;
      });
    }
  }

  clickAction($event: { obj: any; action: any }){
    switch ($event.action.action){
      case MyTableActionEnum.NEW_ROW:
        console.log("clicked:" + $event.action.text, $event.obj);
        this.formRequest = true;
        this.book = {} as BookingTemplate;
        break;
      case MyTableActionEnum.DELETE:
        console.log("clicked:" + $event.action.text)
        this.bookingService.deleteBooking($event.obj.id).subscribe(()=>this.setBookings());
        break;
      case MyTableActionEnum.EDIT:
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.book = $event.obj
        break;
      case MyTableActionEnum.APPROVE:
        console.log("clicked:" + $event.action.text)
        this.bookingService.validateOrDecline($event.obj.id).subscribe(() => this.setBookings());
    }
    console.log($event.obj,$event.action)
  }

  setRequest($event: boolean) {
    if($event){
      this.setBookings();
    }
  }

}
