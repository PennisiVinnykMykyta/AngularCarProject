import {UserTemplate} from "./user-template";
import {CarTemplate} from "./car-template";

export class BookingTemplate{
  id!: number;
  user!: UserTemplate;
  car!: CarTemplate;
  startDate!: string;
  endDate!: string;
  valid!: boolean;
}
