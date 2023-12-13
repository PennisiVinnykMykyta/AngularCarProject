import {Component, Injectable, OnInit} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {CarTemplate} from "../../templates/dto-templates/car-template";
import {CarsTableConfig} from "./cars-table.config";


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
  constructor(private carService:CarsService, private carTableConfig: CarsTableConfig) {
  }
  ngOnInit() {
    this.formRequest = false;
    if(this.cars === undefined){
      this.setCars();
    }

    this.tableConfig = this.carTableConfig.tableConfig;
    this.tableConfig.addCategoryAction = {
      action: MyTableActionEnum.NEW_CATEGORY,
    }
    this.tableConfig.deleteCategoryAction ={
      action: MyTableActionEnum.DELETE_CATEGORY,
    }
  }

  setCars(){
    this.carService.getAllCars().subscribe(cars => {
        this.cars = cars;
        this.formRequest = false;
      }
    );
  }

  clickAction($event: { obj: any; action: any }) {
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
        break;
      case MyTableActionEnum.NEW_CATEGORY:
        console.log("New Category Added with Name "+ $event.obj)
        //this.carService.addCategory($event.obj).subscribe(() => this.setCars())
        break;
      case MyTableActionEnum.DELETE_CATEGORY:
        console.log("Category Deleted "+ $event.obj)
        //this.carService.deleteCategory($event.obj).subscribe(() => this.setCars())
        break;
    }
  }
  setRequest($event: boolean) {
    if($event){
      this.setCars();
    }
  }

}
