import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowAltCircleLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {BookingsService} from "../../services/bookings.service";
import {CarsService} from "../../services/cars.service";
import {CarTemplate} from "../../templates/dto-templates/car-template";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {BookingDisplayTemplate} from "../../templates/dto-templates/booking-display-template";
import {BookingRequestTemplate} from "../../templates/dto-templates/booking-request-template";

@Component({
  selector: 'app-bookings-form',
  templateUrl: './bookings-form.component.html',
  styleUrls: ['./bookings-form.component.css']
})
export class BookingsFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;

  @Input('book') book!: BookingDisplayTemplate;
  @Input('userId') userData?: string | null;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  datesSelected!: boolean;

  carTableConfig!: CustomTableConfig;
  requestBook!: BookingRequestTemplate;

  availableCars!: CarTemplate[];
  constructor(private router: Router, private bookService:BookingsService,private carService: CarsService) {
  }
  ngOnInit() {
    this.datesSelected = false;
  }

  clickAction($event: {obj: any, action: any}){
    this.requestBook = {
      bookId: this.book.id,
      carId: $event.obj.id,
      email: this.userData,
      startDate: this.book.startDate,
      endDate: this.book.endDate
    }

    this.bookService.addOrUpdateBooking(this.requestBook).subscribe(() =>this.back());
  }

  confirmDates() {
    this.datesSelected = true;
    this.setTableConfig();

  }

  setTableConfig(){
    if(this.availableCars === undefined){
      this.carService.getAvailableCars(this.book.startDate!,this.book.endDate!).subscribe(cars =>
        {
          this.availableCars = cars;
          if((this.book.car !== undefined && this.book.car !== null) && !(this.availableCars.includes(this.book.car))){
            this.availableCars.push(this.book.car);
          }
        }
      )
    }


    this.carTableConfig = {
      headers:[
        {key: "brand", label: "Brand"},
        {key: "model", label:"Model"},
        {key: "color", label:"Color"},
        {key: "numberPlate", label:"Plate Number"},
        {key:"", label:"Image"}
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
        {
          customCssClass: "btn btn-primary btn-sm",
          action: MyTableActionEnum.NEW_ROW,
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

  reselectDates(){
    this.datesSelected = false;
  }
}
