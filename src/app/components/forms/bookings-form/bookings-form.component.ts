import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowAltCircleLeft, faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {BookingsService} from "../../services/bookings.service";
import * as _ from "lodash";
import {CarsService} from "../../services/cars.service";
import {CarTemplate} from "../../mock-files/templates/car-template";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";

@Component({
  selector: 'app-bookings-form',
  templateUrl: './bookings-form.component.html',
  styleUrls: ['./bookings-form.component.css']
})
export class BookingsFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;

  @Input() book!: any;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  datesSelected!: boolean;


  carInfo?: string;
  startDate?: Date;
  endDate?: Date;
  approval?: boolean;
  tableConfig!: CustomTableConfig;

  availableCars!: CarTemplate[];
  constructor(private router: Router, private bookService:BookingsService,private carService: CarsService) {
  }
  ngOnInit() {
    this.initBookInfo(this.book);
    this.datesSelected = false;
  }

  initBookInfo(obj: any){
    if(obj !== null && obj !==undefined){
      let brandPath= _.get(this.book, 'car.brand');
      let modelPath= _.get(this.book, 'car.model');
      let colorPath= _.get(this.book, 'car.color');
      let plateNumberPath= _.get(this.book, 'car.plateNumber');

      this.carInfo = brandPath + " " + modelPath + " " + colorPath + " " + plateNumberPath
      console.log("carInfo: " + this.carInfo)

    }else{

    console.log(this.endDate);
    }
  }

  clickAction($event: {obj: any, action: any}){
    this.book.startDate;
    this.book.endDate;
    this.book.car = $event.obj;
    this.bookService.addOrUpdateBooking(this.book).subscribe(() => this.goBack.emit(true));
    console.log("car has been booked");
  }

  confirmDates() {
    console.log(this.startDate,this.endDate);
    this.datesSelected = true;
    this.setTableConfig();

  }

  setTableConfig(){
    this.carService.getAvailableCars(this.startDate!,this.endDate!).subscribe(cars => this.availableCars = cars)
    this.tableConfig = {
      headers:[
        {key: "brand", label: "Brand"},
        {key: "model", label:"Model"},
        {key: "color", label:"Color"},
        {key: "plateNumber", label:"Plate Number"}
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
}
