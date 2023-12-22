import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {CarTemplate} from "../../templates/dto-templates/car-template";
import {faArrowAltCircleLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import {CarCategoryTemplate} from "../../templates/dto-templates/car-category-template";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";

@Component({
  selector: 'app-car-category-form',
  templateUrl: './car-category-form.component.html',
  styleUrls: ['./car-category-form.component.css']
})
export class CarCategoryFormComponent implements OnInit{

  @Input() label!: string;

  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();


  carId!: number;
  cars!: CarTemplate[];
  attribute!: string;
  attributeSet: boolean = false;
  carCategory?: CarCategoryTemplate;
  carTableConfig!: CustomTableConfig;


  constructor(private carService : CarsService) {
  }

  ngOnInit() {
    this.setTableConfig()
  }

  confirmLabel() : void{
    if(this.attributeSet){
      this.attributeSet = false;
    }else{
      this.attributeSet = true;
    }
  }

  setTableConfig(): void{
    if(this.cars === undefined){
      this.carService.getAllCars().subscribe(list =>
        {
          this.cars = list;
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
          text: "Add Car",
          icon:faPlus
        }
      ]
    }
  }

  clickAction($event: {obj: any, action: any}): void{
    console.log($event.obj)
    this.carCategory = {
      carId: $event.obj.id,
      carCategoryId: null,
      label : this.label,
      attribute : this.attribute
    }

    this.carService.addCarCategory(this.carCategory).subscribe(() =>this.back());
  }

  back(): void{
    this.goBack.emit(true);
  }

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;

}
