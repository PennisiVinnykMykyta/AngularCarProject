import {Injectable} from "@angular/core";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faCancel, faCarSide, faPlus} from "@fortawesome/free-solid-svg-icons";
import {MyActionEvent} from "../../templates/custom-table/table-details/my-action-event";

@Injectable({
  providedIn: 'root'
})

export  class CarsTableConfig{
  carActions: MyActionEvent[] = [
    {
      action: MyTableActionEnum.NEW_ROW,
      rowAction:false,
      text:"Add Car",
      icon: faPlus
    },
    {
      customCssClass:'btn btn-danger btn-sm',
      action: MyTableActionEnum.DELETE,
      rowAction:true,
      text:"Delete Car",
      icon: faCancel
    },
    {
      customCssClass:'btn btn-warning btn-sm',
      action: MyTableActionEnum.EDIT,
      rowAction: true,
      text: "Change Car Info",
      icon: faCarSide
    },
    {
      action: MyTableActionEnum.NEW_CATEGORY,
      rowAction: false,
      text: "Create New Category"
    },
    {
      action: MyTableActionEnum.DELETE_CATEGORY,
      rowAction: false,
      text: "Delete Category"
    },
    {
      action: MyTableActionEnum.NEW_CAR_CATEGORY,
      rowAction: false,
      dynamicAction: true,
      text: "Add Car To Category"
    },
    {
      action: MyTableActionEnum.DELETE_CAR_CATEGORY,
      rowAction: true,
      dynamicAction: true,
      text: "Remove Car From Category"
    }
  ]


  tableConfig = {
    headers: [
      {key: "brand", label: "Brand"},
      {key: "model", label:"Model"},
      {key: "color", label:"Color"},
      {key: "numberPlate", label:"Plate Number"},
      {key: "image", label:"Image"}
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
    actions: this.carActions
  }

  categoriesConfig = {
    headers: [],
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

    actions:
      {
        action: MyTableActionEnum.DELETE_CATEGORY,
        text: "Delete This Category"
      }

  }

}
