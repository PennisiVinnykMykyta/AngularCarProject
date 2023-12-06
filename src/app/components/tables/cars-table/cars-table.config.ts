import {Injectable} from "@angular/core";
import {MyTableActionEnum} from "../../templates/custom-table/table-details/my-actions";
import {faCancel, faCarSide, faPlus} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})

export  class CarsTableConfig{
  carActions = [
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
    }
  ]


  tableConfig = {
    headers: [
      {key: "brand", label: "Brand"},
      {key: "model", label:"Model"},
      {key: "color", label:"Color"},
      {key: "numberPlate", label:"Plate Number"}
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

}
