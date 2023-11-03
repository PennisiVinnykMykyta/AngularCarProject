import {faArrowAltCircleLeft, faArrowLeft, faArrowRight, faCancel,faUserPlus,faUserEdit,faTrashCan,faPlus,faGear} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class CustomButtonConfig{ //make sure the button gets all of its components
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

export const addCar: CustomButtonConfig = {
  text: "Book Car",
  icon: faPlus
}

export const addUser: CustomButtonConfig = {
  text: "Add New User",
  icon: faUserPlus
}

export const cancelBooking: CustomButtonConfig = {
  text: "Cancel Booking",
  icon: faCancel
}

export const deleteUser: CustomButtonConfig = {
  text: "Close Account",
  icon:  faTrashCan
}

export const modifyBooking: CustomButtonConfig = {
  text: "Modify Booking",
  icon: faGear
}

export const changeUserInfo: CustomButtonConfig = {
  text: "Modify Account",
  icon: faUserEdit
}
