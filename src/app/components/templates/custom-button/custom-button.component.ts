import {Component, Input} from '@angular/core';
import {CustomButtonConfig} from "./custom-button.config";

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent {

  @Input() buttonConfig!: CustomButtonConfig; //make sure buttonConfig is not going to be null
  @Input() enabled: boolean = true;

}
