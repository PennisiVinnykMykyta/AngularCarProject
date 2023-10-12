import {Component, Injectable, OnInit} from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {
  faCancel,
  faCarSide, faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {CustomTableConfig} from "../../templates/custom-table/custom-table.config";
import {CarTemplate} from "../../mock-files/templates/car-template";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";


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
  cars: CarTemplate[] = [];
  carActions!: MyActionEvent[];
  formRequest!: boolean;
  constructor(private carService:CarsService, private router: Router) {
  }
  ngOnInit() {
    this.formRequest = false;
    this.setCars();
    this.carActions = [
      {
        action: MyTableActionEnum.NEW_ROW,
        rowAction:false,
        text:"Book Car",
        icon: faPlus
      },
      {
        action: MyTableActionEnum.NEW_ROW,
        rowAction:false,
        text:"Add Car",
        icon: faPlus
      },
      {
        action: MyTableActionEnum.DELETE,
        rowAction:true,
        text:"Delete Car",
        icon: faCancel
      },
      {
        action: MyTableActionEnum.EDIT,
        rowAction: true,
        text: "Change Car Info",
        icon: faCarSide
      }
    ]


    this.tableConfig = {
      headers: [
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
      actions: this.carActions
    }
  }

  setCars(){
    return this.carService.getAllCars().subscribe(cars => this.cars = cars);
  }

  clickAction($event: { obj: any; action: any }) {
    switch ($event.action.text) {
      case "Book Car":
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.car = null;
        break;

      case "Add Car":
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.car = null;
        break;

      case "Delete Car":
        console.log("clicked:" + $event.action.text)
        this.carService.deleteCar($event.obj.id);
        break;
      case "Change Car Info":
        console.log("clicked:" + $event.action.text)
        this.formRequest = true;
        this.car = $event.obj
        break;
    }
  }
  setRequest($event: boolean) {
    if($event === true){
      this.formRequest = false;
    }
  }

}
