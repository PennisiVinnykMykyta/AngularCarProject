import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowAltCircleLeft, faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {BookingsService} from "../../services/bookings.service";
import {CarsService} from "../../services/cars.service";
import {CarTemplate} from "../../mock-files/templates/car-template";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {BookingDisplayTemplate} from "../../mock-files/templates/booking-display-template";
import {UserTemplate} from "../../mock-files/templates/user-template";
import {BookingRequestTemplate} from "../../mock-files/templates/booking-request-template";

@Component({
  selector: 'app-bookings-form',
  templateUrl: './bookings-form.component.html',
  styleUrls: ['./bookings-form.component.css']
})
export class BookingsFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;

  @Input('book') book!: BookingDisplayTemplate;
  @Input('user') user!: UserTemplate;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  datesSelected!: boolean;

  carTableConfig!: CustomTableConfig;
  requestBook!: BookingRequestTemplate;

  availableCars: CarTemplate[] = [];
  constructor(private router: Router, private bookService:BookingsService,private carService: CarsService) {
  }
  ngOnInit() {
    this.datesSelected = false;
    if(this.book.user === null){
      this.book.user = this.user;
    }

  }

  clickAction($event: {obj: any, action: any}){
    this.requestBook = {
      bookId: this.book.id,
      carId: $event.obj.id,
      userId: this.book.user.id,
      startDate: this.book.startDate,
      endDate: this.book.endDate
    }

    this.bookService.addOrUpdateBooking(this.requestBook).subscribe(() =>this.back());
  }

  confirmDates() {
    this.datesSelected = true;
    console.log(this.book.startDate,this.book.endDate);
    this.setTableConfig();

  }

  setTableConfig(){
    this.carService.getAvailableCars(this.book.startDate!,this.book.endDate!).subscribe(cars =>
    {
      this.availableCars = cars;
      if((this.book.car !== null || true) && !this.availableCars.includes(this.book.car)){
        this.availableCars.push(this.book.car);
      }
    }
    )
    console.log(this.availableCars);
    this.carTableConfig = {
      headers:[
        {key: "brand", label: "Brand"},
        {key: "model", label:"Model"},
        {key: "color", label:"Color"},
        {key: "numberPlate", label:"Plate Number"}
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
      actions: [
        { action: MyTableActionEnum.NEW_ROW,
          rowAction:true,
          text: "Book Car",
          icon:faPlus
        }
      ]
    }
  }

  back(){
    this.goBack.emit(true);
  }
}
