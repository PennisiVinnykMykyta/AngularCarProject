import {Component, Injectable, OnInit} from '@angular/core';
import {BookingTemplate} from "../../mock-files/templates/booking-template";
import {BookingsService} from "../../services/bookings.service";
import {ActivatedRoute} from "@angular/router";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBookBookmark, faCancel, faGear, faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";


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
  bookActions!: MyActionEvent[];
  tableConfig!: CustomTableConfig;

  adminBookActions: MyActionEvent[] = [
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
      action: MyTableActionEnum.APPROVE,
      rowAction: true,
      text: "Approve/Disapprove",
      icon: faBookBookmark
    },
  ]

  userBookActions: MyActionEvent[] = [
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
    }
  ]

  constructor(private bookingService: BookingsService,private route:ActivatedRoute, private authService: AuthenticationService) {
  }
  ngOnInit() {

    this.formRequest = false;
    this.setBookings();

    if(this.authService.getUser().role === 'Admin'){
      this.bookActions = this.adminBookActions;
    }else{
      this.bookActions = this.userBookActions;
    }



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

    if(this.authService.getUser().role === 'Admin'){

      if(this.route.snapshot.paramMap.get('id') !== null){
        let id: number = +this.route.snapshot.paramMap.get('id')!;
        console.log(id);

        return this.bookingService.getUserBookings(id).subscribe(books => this.bookings = books)
      }else{
        return this.bookingService.getAllBookings().subscribe(books => this.bookings = books);
      }

    }else{
      return this.bookingService.getUserBookings(this.authService.getUser().id).subscribe(books =>this.bookings = books);
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
    if($event === true){
      this.formRequest = false;
    }
  }

}
