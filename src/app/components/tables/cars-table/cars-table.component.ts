import {Component, OnInit} from '@angular/core';
import {CarsService} from "../../services/cars.service";

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent implements OnInit{

  constructor(private carService:CarsService) {
  }
  ngOnInit() {
  }

  getAllCars(){
    return this.carService.getAllCars();
  }

}
