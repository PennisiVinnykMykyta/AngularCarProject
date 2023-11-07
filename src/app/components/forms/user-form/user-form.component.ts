import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {faArrowAltCircleLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
import {UserDisplayTemplate} from "../../templates/dto-templates/user-display-template";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements  OnInit{

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
  protected readonly faCheck = faCheck;


  @Input() user!: UserDisplayTemplate;
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    console.log(this.user);

  }

  updateUser($event: any) {
    console.log(this.user);
    this.userService.addOrUpdateUser(this.user).subscribe(() => this.back());
  }

  public back(){
    this.goBack.emit(true);
  }
}
