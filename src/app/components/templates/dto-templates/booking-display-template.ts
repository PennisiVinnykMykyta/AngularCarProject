import {UserDisplayTemplate} from "./user-display-template";
import {CarTemplate} from "./car-template";

export class BookingDisplayTemplate {
  id!: number;
  user!: UserDisplayTemplate;
  car!: CarTemplate;
  startDate!: Date;
  endDate!: Date;
  valid!: boolean;
}
