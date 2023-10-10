import { Injectable } from '@angular/core';
import {CarTemplate} from "../mock-files/templates/car-template";
import {Observable, of} from "rxjs";
import {Cars} from "../mock-files/mock-cars";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor() { }

  getAllCars(): Observable<CarTemplate[]>{
    const cars : Observable<CarTemplate[]> = of(Cars);
    return cars;
  }

  getAvailableCars(): void{
    //get cars with available = true
  }

  deleteCar(id:number): void{

  }

  addCar(): void {
    //return blank form
  }

  modifyCar(id:number): void{
    //return form filled with info to modify
  }
}
