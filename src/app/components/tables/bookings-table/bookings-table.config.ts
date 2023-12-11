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
      customCssClass:'btn btn-danger btn-sm',
      action: MyTableActionEnum.DELETE,
      rowAction:true,
      text:"Cancel Booking",
      icon: faCancel
    },
    {
      customCssClass:'btn btn-warning btn-sm',
      action: MyTableActionEnum.EDIT,
      rowAction:true,
      text:"Change Booking",
      icon: faGear
    }
  ]

  userBookActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.NEW_ROW,
      rowAction: false,
      text:"Make a Booking",
      icon: faPlus
    },
    {
      customCssClass:'btn btn-danger btn-sm',
      action: MyTableActionEnum.DELETE,
      rowAction:true,
      text:"Cancel Booking",
      icon: faCancel
    },
    {
      customCssClass:'btn btn-warning btn-sm',
      action: MyTableActionEnum.EDIT,
      rowAction:true,
      text:"Change Booking",
      icon: faGear
    }
  ]

  tableConfigAdmin = {
    headers: [
      {key: "user.firstName", label: "User Name"},
      {key: "user.lastName", label: "User Surname"},
      {key: "user.email", label: "User Email"},
      {key: "car.brand", label: "Car Brand"},
      {key: "car.model", label: "Car Model"},
      {key: "car.numberPlate", label: "Plate Number"},
      {key: "car.color", label: "Car Color"},
      {key: "startDate", label: "Start Date"},
      {key: "endDate", label: "End Date"},
      {key: "valid", label: "Approval"}
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
      {key: "user.firstName", label: "User Name"},
      {key: "user.lastName", label: "User Surname"},
      {key: "user.email", label: "User Email"},
      {key: "car.brand", label: "Car Brand"},
      {key: "car.model", label: "Car Model"},
      {key: "car.numberPlate", label: "Plate Number"},
      {key: "car.color", label: "Car Color"},
      {key: "startDate", label: "Start Date"},
      {key: "endDate", label: "End Date"},
      {key: "valid", label: "Approval"}
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
