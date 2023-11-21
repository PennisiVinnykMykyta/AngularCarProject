import {Injectable} from '@angular/core';
import {CarTemplate} from "../templates/dto-templates/car-template";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarTemplate[]>{
    return this.http.get<CarTemplate[]>(`http://localhost:8080/api/car/list`);
  }

  getAvailableCars(start: Date, end:Date): Observable<CarTemplate[]>{
    //will select cars available for the selected dates
    return  this.http.get<CarTemplate[]>(`http://localhost:8080/api/car/available-cars/${start},${end}`);
  }

  deleteCar(carId:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/car/delete/${carId}`);
  }

  addORUpdateCare(car: CarTemplate): Observable<any> {
    return this.http.post(`http://localhost:8080/api/car/add-or-update`,car);
  }

}
