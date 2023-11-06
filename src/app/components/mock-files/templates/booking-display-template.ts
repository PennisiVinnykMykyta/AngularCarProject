import {UserTemplate} from "./user-template";
import {CarTemplate} from "./car-template";

export class BookingDisplayTemplate {
  id!: number;
  user!: UserTemplate;
  car!: CarTemplate;
  startDate!: Date;
  endDate!: Date;
  valid!: boolean;
}
