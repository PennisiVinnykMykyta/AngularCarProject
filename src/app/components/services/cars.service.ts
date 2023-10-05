import { Injectable } from '@angular/core';
import {CarTemplate} from "../mock-files/templates/car-template";
import {Cars} from "../mock-files/mock-cars";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor() { }

  getAllCars():CarTemplate[]{
    return Cars;
  }
}
