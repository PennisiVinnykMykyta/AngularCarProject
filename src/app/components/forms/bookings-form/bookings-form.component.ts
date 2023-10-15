import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCheck,faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {BookingsService} from "../../services/bookings.service";
import * as _ from "lodash";

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
  constructor(private router: Router, private bookService:BookingsService) {
  }
  ngOnInit() {
    this.initBookInfo(this.book);
    this.datesSelected = false;
  }

  initBookInfo(obj: any){
    if(obj !== null){
      let brandPath= _.get(this.book, 'car.brand');
      let modelPath= _.get(this.book, 'car.model');
      let colorPath= _.get(this.book, 'car.color');
      let plateNumberPath= _.get(this.book, 'car.plateNumber');

      this.carInfo = brandPath + " " + modelPath + " " + colorPath + " " + plateNumberPath
      console.log("carInfo: " + this.carInfo)

    }else{

   //console.log(this.endDate);
    }
  }

  addOrUpdateBook(obj:any){
    if(obj !== null){
      this.bookService.addOrUpdateBooking(obj.id);
    }else{
      this.bookService.addOrUpdateBooking(obj);
    }
  }

  clickAction(action?:string){
    if(action!=='back'){
      this.addOrUpdateBook(this.book);
    }
    this.goBack.emit(true);
  }

  ConfirmDates() {
    //console.log(this.endDate);
    this.datesSelected = true;
  }
}
