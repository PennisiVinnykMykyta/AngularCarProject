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

  carCategoriesAttributes: string[] = [];

  ngOnInit() {


    if(this.carCategories !== undefined){
      for(let index = 0; index<this.carCategories.length; index++){
        this.carCategoriesAttributes.push(this.carCategories[index].attribute);
      }

    }
  }


  clickAction(action?:string):void{ //trovare solo att modificati ed aggiornare solo quelli
    if(action !== 'back'){
      this.carService.addORUpdateCar(this.car).subscribe(() => {
        if(this.carCategories !== undefined){
          for(let index = 0; index<this.carCategories.length; index++){

            if(this.carCategoriesAttributes[index] !== this.carCategories[index].attribute){

              this.carService.updateAttribute(this.carCategories[index],this.car.id).subscribe();

            }

          }
        }
        this.clickAction("back")
      });
    }else{
      this.goBack.emit(true);
    }
  }


}
