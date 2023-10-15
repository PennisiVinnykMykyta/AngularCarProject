import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

import {NavigationBarConfig} from "./navigation-bar.config";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent{

   @Input() userBarConfig!: NavigationBarConfig;

  constructor(private router: Router) {
  }


  clickAction(str: string ){
    console.log("action clicked",str);
    void this.router.navigateByUrl(str);
  }

}
