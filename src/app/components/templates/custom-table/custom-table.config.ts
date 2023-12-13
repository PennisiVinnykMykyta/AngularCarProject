import {MyHeaders} from "./table-details/my-headers";
import {MyOrder} from "./table-details/my-order";
import {MyPagination} from "./table-details/my-pagination";
import {MyActionEvent} from "./table-details/my-action-event";

export class  CustomTableConfig{
  headers!: MyHeaders[];
  order!: MyOrder;
  pagination!: MyPagination;
  actions!: MyActionEvent[];

  addCategoryAction?: MyActionEvent;
  deleteCategoryAction?: MyActionEvent;

}
