import {Injectable} from "@angular/core";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBookBookmark, faCancel, faGear, faPlus} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class BookingsTableConfig{

  adminBookActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.DELETE,
      rowAction:true,
      text:"Cancel Booking",
      icon: faCancel
    },
    {
      action: MyTableActionEnum.EDIT,
      rowAction:true,
      text:"Change Booking",
      icon: faGear
    },
    {
      action: MyTableActionEnum.APPROVE,
      rowAction: true,
      text: "Approve/Disapprove",
      icon: faBookBookmark
    },
  ]

  userBookActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.NEW_ROW,
      rowAction: false,
      text:"Make a Booking",
      icon: faPlus
    },
    {
      action: MyTableActionEnum.DELETE,
      rowAction:true,
      text:"Cancel Booking",
      icon: faCancel
    },
    {
      action: MyTableActionEnum.EDIT,
      rowAction:true,
      text:"Change Booking",
      icon: faGear
    }
  ]

  tableConfigAdmin = {
    headers: [
      {key: "user.name", label: "User Name"},
      {key: "user.lastName", label: "User Surname"},
      {key: "user.email", label: "User Email"},
      {key: "car.brand", label: "Car Brand"},
      {key: "car.model", label: "Car Model"},
      {key: "car.plateNumber", label: "Plate Number"},
      {key: "car.color", label: "Car Color"},
      {key: "startDate", label: "Start Date"},
      {key: "endDate", label: "End Date"},
      {key: "approved", label: "Approval"}
    ],
    order: {
      orderType: "desc",
      defaultColumn: "desc"
    },
    pagination:{
      itemPerPage: 5,
      itemPerPageOptions:[
        5,
        10
      ]
    },
    actions: this.adminBookActions
  }

  tableConfigUser = {
    headers: [
      {key: "user.name", label: "User Name"},
      {key: "user.lastName", label: "User Surname"},
      {key: "user.email", label: "User Email"},
      {key: "car.brand", label: "Car Brand"},
      {key: "car.model", label: "Car Model"},
      {key: "car.plateNumber", label: "Plate Number"},
      {key: "car.color", label: "Car Color"},
      {key: "startDate", label: "Start Date"},
      {key: "endDate", label: "End Date"},
      {key: "approved", label: "Approval"}
    ],
    order: {
      orderType: "desc",
      defaultColumn: "desc"
    },
    pagination:{
      itemPerPage: 5,
      itemPerPageOptions:[
        5,
        10
      ]
    },
    actions: this.userBookActions
  }

}
