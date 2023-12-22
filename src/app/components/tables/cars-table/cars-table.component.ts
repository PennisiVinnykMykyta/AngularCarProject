import {Component, Injectable, OnInit} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {CarTemplate} from "../../templates/dto-templates/car-template";
import {CarsTableConfig} from "./cars-table.config";
import {CategoryTemplate} from "../../templates/dto-templates/category-template";
import {CarCategoryDisplayTemplate} from "../../templates/dto-templates/car-category-display-template";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent implements OnInit{

  car!: any;
  tableConfig!: CustomTableConfig;
  cars!: CarTemplate[];
  formRequest!: boolean;
  categoryFormRequest!: boolean;
  carCategoryFormRequest!: boolean;
  categoryLabel?: string;
  categories?: CategoryTemplate[];
  carCategories!: CarCategoryDisplayTemplate[];

  labels?: string[];
  attributes?: string[];
  constructor(private carService:CarsService, private carTableConfig: CarsTableConfig) {
  }
  ngOnInit() {
    this.formRequest = false;
    this.categoryFormRequest = false;
    if(this.cars === undefined){
      this.setCars();
    }

    this.tableConfig = this.carTableConfig.tableConfig;

  }

  setCars():void{
    this.carService.getAllCars().subscribe(cars => {
        this.cars = cars;
        this.formRequest = false;
        this.categoryFormRequest = false;
        this.carCategoryFormRequest = false;
        this.carService.getAllCategories().subscribe(categories => {
          this.labels = [];
          this.attributes = [];
          for(let index=0; index<categories.length; index++){
           if(!this.labels?.find(e => e === categories[index].label)){
              this.labels?.push(categories[index].label);
            }
            this.attributes?.push(categories[index].attribute)
          }
        })
      }
    );
  }

  clickAction($event: { obj: any; action: any }):void {
    switch ($event.action.action) {
      case MyTableActionEnum.NEW_ROW:
        this.formRequest = true;
        this.car = {} as CarTemplate;
        break;

      case MyTableActionEnum.DELETE:
        this.carService.deleteCar($event.obj.id).subscribe(() => this.setCars());
        break;
      case MyTableActionEnum.EDIT:
        this.formRequest = true;
        this.car = $event.obj
        this.carService.getCategoriesOfCar(this.car.id).subscribe( list => this.categories = list)
        break;
      case MyTableActionEnum.NEW_CATEGORY:
        this.categories = undefined;
        this.categoryFormRequest = true;
        break;
      case MyTableActionEnum.DELETE_CATEGORY:
        this.categoryFormRequest = true;
        this.carService.getAllCategories().subscribe(list =>{
          this.categories = list;
        })
        break;
      case MyTableActionEnum.NEW_CAR_CATEGORY:
        console.log($event.obj)
        this.carCategoryFormRequest = true;
        this.categoryLabel = $event.obj;
        break;
      case MyTableActionEnum.DELETE_CAR_CATEGORY:
        this.carService.deleteCarCategory($event.obj.id).subscribe(()=>this.setCars())
        break;
    }
  }

  uploadImage(event: { data:any, id:number }):void {
    const uploadImageData: FormData = new FormData();

    uploadImageData.append('imageFile',event.data, event.data.name);

    this.carService.uploadCarPic(uploadImageData,event.id).subscribe(() =>{
      this.setCars();
    });

  }

  setRequest($event: boolean):void {
    if($event){
      this.setCars();
    }
  }

}
