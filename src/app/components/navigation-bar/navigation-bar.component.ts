import {Component, OnInit} from '@angular/core';
import {MyActionEvent} from "../templates/custom-table/table-details/my-action-event";
import {MyTableActionEnum} from "../templates/custom-table/table-details/my-actions";
import {faBook, faCar, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements  OnInit{

  actions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.VIEW,
      text: 'View Cars',
      icon : faCar
    },
    {
      action: MyTableActionEnum.VIEW,
      text: 'View Users',
      icon : faUsers
    },
    {
      action: MyTableActionEnum.VIEW,
      text: 'View Bookings',
      icon : faBook
    },
  ]
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  clickAction(str: string | undefined){ //ok now we need to redirect to the correct form based on the action pressed
    console.log("action clicked",str);
    if(str === 'View Bookings'){
      void this.router.navigate(['/table/bookings'])
    }
  }

}
