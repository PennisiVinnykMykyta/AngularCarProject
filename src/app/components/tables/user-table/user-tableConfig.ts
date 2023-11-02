import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faBook, faCancel, faUserGear, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export  class UserTableConfig{
  adminActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.NEW_ROW,
      rowAction:false,
      text:"Add User",
      icon: faUserPlus
    },
    {
      action: MyTableActionEnum.DELETE,
      rowAction:true,
      text:"Delete User",
      icon: faCancel
    },
    {
      action: MyTableActionEnum.EDIT,
      rowAction: true,
      text: "Change User Info",
      icon: faUserGear
    },
    {
      action: MyTableActionEnum.UBOOKINGS,
      rowAction: true,
      text: "View User Bookings",
      icon: faBook
    }
  ]
  userActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.EDIT,
      rowAction: true,
      text: "Change User Info",
      icon: faUserGear
    }
  ]

  tableConfigUser = {
    headers: [
      {key: "firstName", label: "First Name"},
      {key: "lastName", label:"Last Name"},
      {key: "email", label:"Email"},
      {key: "birthDate", label:"Birthday"}
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
    actions: this.userActions
  }

  tableConfigAdmin = {
    headers: [
      {key: "firstName", label: "First Name"},
      {key: "lastName", label:"Last Name"},
      {key: "email", label:"Email"},
      {key: "birthDate", label:"Birthday"}
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
    actions: this.adminActions
  }
}
