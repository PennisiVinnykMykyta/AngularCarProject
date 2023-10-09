import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {NavigationBarConfig} from "./navigation-bar.config";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements  OnInit{

   @Input() userBarConfig!: NavigationBarConfig;
   @Input() adminBarConfig?: NavigationBarConfig;

  constructor(private router: Router, private route:ActivatedRoute) {
  }

  ngOnInit() {

  }

  clickAction(str: string ){ //ok now we need to redirect to the correct form based on the action pressed
    console.log("action clicked",str);
    void this.router.navigateByUrl(str);
  }

}
