import {UserTemplate} from "./user-template";
import {CarTemplate} from "./car-template";

export class BookingTemplate{
  id!: number;
  user!: UserTemplate;
  car!: CarTemplate;
  startDate!: Date;
  endDate!: Date;
  valid!: boolean;
}
