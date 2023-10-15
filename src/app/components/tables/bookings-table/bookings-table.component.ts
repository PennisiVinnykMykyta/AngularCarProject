import {Component, Injectable, OnInit} from '@angular/core';
import {BookingTemplate} from "../../mock-files/templates/booking-template";
import {BookingsService} from "../../services/bookings.service";
import {Router} from "@angular/router";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBookBookmark, faCancel, faGear, faPlus} from "@fortawesome/free-solid-svg-icons";
import * as _ from "lodash";


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements  OnInit{

  formRequest!: boolean;
  book!: any;
  bookings!: BookingTemplate[];
  bookActions!: MyActionEvent[];
  tableConfig!: CustomTableConfig;

  constructor(private bookingService: BookingsService,private router:Router) {
  }
  ngOnInit() {
    this.formRequest = false;
    this.setBookings();
    this.bookActions = [
      {
        action: MyTableActionEnum.NEW_ROW,
        rowAction: false,
        text:"Make a Booking",
        icon: faPlus
      },
      {
        action: MyTableActionEnum.DELETE,
        rowAction:true,
        text:"Cancel Booking",
        icon: faCancel
      },
      {
        action: MyTableActionEnum.EDIT,
        rowAction:true,
        text:"Change Booking",
        icon: faGear
      },
      {
        action: MyTableActionEnum.EDIT,
        rowAction: true,
        text: "Approve/Disapprove",
        icon: faBookBookmark
      },
    ]


    this.tableConfig = {
      headers: [
        {key: "user.name", label: "User Name"},
        {key: "user.lastName", label: "User Surname"},
        {key: "user.email", label: "User Email"},
        {key: "car.brand", label: "Car Brand"},
        {key: "car.model", label: "Car Model"},
        {key: "car.plateNumber", label: "Plate Number"},
        {key: "car.color", label: "Car Color"},
        {key: "startDate", label: "Start Date"},
        {key: "endDate", label: "End Date"},
        {key: "approved", label: "Approval"}
      ],
      order: {
        orderType: "desc",
        defaultColumn: "desc"
      },
      pagination:{
        itemPerPage: 5,
        itemPerPageOptions:[
          5,
          10
        ]
      },
      actions: this.bookActions
    }

  }

  setBookings(){
    return this.bookingService.getAllBookings().subscribe(books => this.bookings = books);
  }

  clickAction($event: { obj: any; action: any }){
    switch ($event.action.text){
      case "Make a Booking":
        console.log("clicked:" + $event.action.text, $event.obj);
        this.formRequest = true;
        this.book = null;
        break;
      case "Delete Book":
        console.log("clicked:" + $event.action.text)
        this.bookingService.deleteBooking($event.obj.id);
        break;
      case "Change Booking":
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.book = $event.obj
        break;
    }
    console.log($event.obj,$event.action)
  }

  setRequest($event: boolean) {
    if($event === true){
      this.formRequest = false;
    }
  }

}
