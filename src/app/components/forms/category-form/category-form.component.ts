import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
import {CategoryTemplate} from "../../templates/dto-templates/category-template";
import {CarCategoryTemplate} from "../../templates/dto-templates/car-category-template";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit{

  @Input() categories?: CategoryTemplate[]

  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  label!: string;
  attribute!: string;
  categoriesToDelete: Set<string> = new Set()

  constructor(private carService: CarsService) {
  }

  ngOnInit() {

    if(this.categories !== undefined){
      for(let index = 0; index < this.categories.length; index++){
        this.categoriesToDelete.add(this.categories[index].label)
      }
    }
  }

  clickAction(action?:string){
    if(action === 'add'){
      const category: CategoryTemplate = {
        id: null,
        label: this.label,
        attribute: this.attribute
      }
      this.carService.addCategory(category).subscribe(() => this.clickAction("back"));
    }else if(action === 'delete')
    {
      this.carService.deleteCategory(this.label).subscribe( () => this.clickAction("back"));
    }else{
      this.goBack.emit(true);
    }
  }


  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;
}
