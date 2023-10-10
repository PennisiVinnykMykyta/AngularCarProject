import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;

  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit() {
  }

  clickAction(action:string){
    if(action === 'back'){
      void this.router.navigateByUrl('/users');
    }
  }
}
