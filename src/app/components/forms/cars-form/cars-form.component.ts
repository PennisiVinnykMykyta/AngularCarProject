import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
import {CarTemplate} from "../../templates/dto-templates/car-template";
import {CategoryTemplate} from "../../templates/dto-templates/category-template";

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent implements OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;

  @Input() car!: CarTemplate;
  @Input() carCategories?: CategoryTemplate[];
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private carService: CarsService) {
  }

  categoriesToSave?: CategoryTemplate[];

  ngOnInit() {

    this.categoriesToSave = this.carCategories;
  }


  clickAction(action?:string):void{
    if(action !== 'back'){
      this.carService.addORUpdateCar(this.car).subscribe(() => {
        if(this.carCategories !== undefined){
          for(let index = 0; index<this.carCategories.length; index++){
            this.carService.updateAttribute(this.carCategories[index],this.car.id).subscribe();
          }
        }
        this.clickAction("back")
      });
    }else{
      this.goBack.emit(true);
    }
  }


}
