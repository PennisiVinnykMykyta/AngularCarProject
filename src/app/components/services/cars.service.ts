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

  getAvailableCars(start: Date, end:Date): Observable<CarTemplate[]>{
    //will select cars available for the selected dates
    return  of(Cars);
  }

  deleteCar(id:number): void{

  }

  addORUpdateCare(id:number | null): void {
    //return blank form
  }

}
