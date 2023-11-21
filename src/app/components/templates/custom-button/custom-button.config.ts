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
  text: "Go Back",
  icon: faArrowAltCircleLeft
}

export  const cancel: CustomButtonConfig = {
  text: "Cancel",
  icon: faCancel
}

export  const next: CustomButtonConfig = {
  text: "Next",
  icon: faArrowRight
}
export  const previous: CustomButtonConfig = {
  text: "Previous",
  icon: faArrowLeft
}

