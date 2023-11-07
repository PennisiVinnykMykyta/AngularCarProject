import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

import {NavigationBarConfig} from "./navigation-bar.config";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent{

   @Input() userBarConfig!: NavigationBarConfig;
   @Output() logOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }


  clickAction(str: string ){
    console.log("action clicked",str);
    if(str === undefined){
      this.logOut.emit(true);
    }
    void this.router.navigateByUrl(str);

  }

}
