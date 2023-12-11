import {MyTableActionEnum} from "./my-actions";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class MyActionEvent{
  customCssClass?: string;
  action!: MyTableActionEnum;
  rowAction?: boolean;
  text?: string;
  icon?: IconDefinition;
  dynamicAction?: boolean;
  dynamicText? (val: boolean) : string;

}
