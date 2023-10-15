import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;

  @Input() car!: any;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  model?: string = '';
  brand?: string = '';
  color?: string = '';
  plateNumber?: string = '';

  constructor(private carService: CarsService) {
  }

  ngOnInit() {
    this.initCarInfo(this.car);
  }

  initCarInfo(obj: any){
    if(obj!==null){
      this.model = obj.model;
      this.brand = obj.brand;
      this.color = obj.color;
      this.plateNumber = obj.plateNumber;
    }
  }

  addOrUpdate(obj: any){
    if(obj !== null){
      this.carService.addORUpdateCare(obj.id);
    }else{
      this.carService.addORUpdateCare(obj);
    }
  }

  clickAction(action?:string){
    if(action !== 'back'){
      this.addOrUpdate(this.car)
    }else{
      this.goBack.emit(true);
    }
  }


}
