import {Injectable} from '@angular/core';
import {CarTemplate} from "../mock-files/templates/car-template";
import {Observable, of} from "rxjs";
import {Cars} from "../mock-files/mock-cars";
import {HttpClient} from "@angular/common/http";
import {BookingTemplate} from "../mock-files/templates/booking-template";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarTemplate[]>{
    return of(Cars);
  }

  getAvailableCars(start: Date, end:Date): Observable<CarTemplate[]>{
    //will select cars available for the selected dates
    return  this.http.get<CarTemplate[]>(`http://localhost:8080/api/car/available-cars/${start},${end}`);
  }

  deleteCar(id:number): void{
    console.log("deleted the car with id:" + id)
  }

  addORUpdateCare(id:number | null): void {
    console.log("added or updated the car with id:" + id)
  }

}
