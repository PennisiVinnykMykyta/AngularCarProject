import {Injectable} from '@angular/core';
import {CarTemplate} from "../templates/dto-templates/car-template";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CategoryTemplate} from "../templates/dto-templates/category-template";
import {CarCategoryTemplate} from "../templates/dto-templates/car-category-template";
import {CarCategoryDisplayTemplate} from "../templates/dto-templates/car-category-display-template";

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

  getAllCategories(): Observable<CategoryTemplate[]>{
    return this.http.get<CategoryTemplate[]>(`http://localhost:8080/api/category/list`);
  }

  getAllCarCategories(): Observable<CarCategoryDisplayTemplate[]>{
    return this.http.get<CarCategoryDisplayTemplate[]>(`http://localhost:8080/api/car-category/list`);
  }

  getCategoriesOfCar(carId: number): Observable<CategoryTemplate[]>{
    return  this.http.get<CategoryTemplate[]>(`http://localhost:8080/api/category/list/by-car/${carId}`);
  }

  getCarsOfCategory(label: string): Observable<CategoryTemplate[]>{
    return  this.http.get<CategoryTemplate[]>(`http://localhost:8080/api/category/list/by-car/${label}`);
  }

  deleteCar(carId:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/car/delete/${carId}`);
  }

  addORUpdateCar(car: CarTemplate): Observable<any> {
    return this.http.post(`http://localhost:8080/api/car/add-or-update`,car);
  }

  updateAttribute(category: CategoryTemplate, carId: number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/category/update-attribute/${carId}`,category);
  }

  addCategory(category : CategoryTemplate): Observable<any>{
    return this.http.post(`http://localhost:8080/api/category/add-or-update`,category)
  }

  addCarCategory(category : CarCategoryTemplate): Observable<any>{
    return this.http.post(`http://localhost:8080/api/car-category/add-or-update`,category)
  }
  deleteCategory(categoryLabel : string): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/category/delete/${categoryLabel}`)
  }

  deleteCarCategory(categoryId : number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/car-category/delete/${categoryId}`)
  }

  uploadCarPic(obj:any,carId:number): Observable<any>{
    return this.http.post(`http://localhost:8080/api/car/car-pic/upload/${carId}`,obj);
  }

  downloadCarPic(carId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/car/car-pic/download/${carId}`);
  }

}
