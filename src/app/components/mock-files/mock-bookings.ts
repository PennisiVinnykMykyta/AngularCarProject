import {BookingTemplate} from "./templates/booking-template";
import {Users} from "./mock-users";
import {Cars} from "./mock-cars";

export  const  Bookings: BookingTemplate[] = [
  {id:0, user: Users[0], car: Cars[2], startDate: '10-10-2024', endDate: '03-09-2026', valid: true},
  {id:1, user: Users[2], car: Cars[3], startDate: '15-11-2026', endDate: '03-09-2027', valid: true},
  {id:2, user: Users[4], car: Cars[0], startDate: '10-10-2023', endDate: '03-01-2024', valid: false},
]
