import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
import {CarTemplate} from "../../mock-files/templates/car-template";

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;

  @Input() car!: CarTemplate;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private carService: CarsService) {
  }

  ngOnInit() {
    console.log(this.car);
  }

  clickAction(action?:string){
    if(action !== 'back'){
      this.carService.addORUpdateCare(this.car).subscribe(() => this.clickAction("back"));
    }else{
      this.goBack.emit(true);
    }
  }


}
