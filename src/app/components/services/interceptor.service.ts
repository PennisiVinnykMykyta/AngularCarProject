import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone(
      {
        setHeaders: {

          Authorization: `Bearer${this.authService.getToken()}`,

        }
      })

    return next.handle(request);
  }

  constructor(private authService: AuthenticationService) { }
}
