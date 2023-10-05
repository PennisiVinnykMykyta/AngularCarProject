import {MyTableActionEnum} from "./my-actions";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class MyActionEvent{
  action!: MyTableActionEnum;
  rowAction?: boolean;
  text?: string;
  icon?: IconDefinition;
}
