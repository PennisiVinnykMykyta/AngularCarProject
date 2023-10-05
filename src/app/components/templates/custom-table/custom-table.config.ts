import {MyHeaders} from "./table-details/my-headers";
import {MyOrder} from "./table-details/my-order";
import {MySearch} from "./table-details/my-search";
import {MyPagination} from "./table-details/my-pagination";
import {MyActionEvent} from "./table-details/my-action-event";

export class  CustomTableConfig{
  headers!: MyHeaders[];
  order!: MyOrder;
  search?: MySearch;
  pagination!: MyPagination;
  actions!: MyActionEvent[];
}
