import {faArrowAltCircleLeft, faArrowLeft, faArrowRight, faCancel} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class CustomButtonConfig{
  customCssClass?: string;
  text?: string;
  icon?: IconDefinition;
  path?: string;
  type?: string;
}

export const back: CustomButtonConfig = {
  customCssClass: "btn btn-dark btn-sm",
  text: "Go Back",
  icon: faArrowAltCircleLeft
}

export  const cancel: CustomButtonConfig = {
  customCssClass: "btn btn-warning btn-sm",
  text: "Cancel",
  icon: faCancel
}

export  const next: CustomButtonConfig = {
  customCssClass: "btn btn-dark btn-sm",
  text: "Next",
  icon: faArrowRight
}
export  const previous: CustomButtonConfig = {
  customCssClass: "btn btn-dark btn-sm",
  text: "Previous",
  icon: faArrowLeft
}

