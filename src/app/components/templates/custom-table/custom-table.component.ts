import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomTableConfig} from "./custom-table.config";
import {faArrowDown, faArrowUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {
  addCar,
  addUser,
  back,
  cancel,
  cancelBooking,
  changeUserInfo,
  CustomButtonConfig,
  deleteUser,
  modifyBooking,
  next,
  previous
} from "../custom-button/custom-button.config";
import {MyTableActionEnum} from "./table-details/my-actions";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() tableConfig!: CustomTableConfig;

  @Input() data!: any[];

  @Output() getTableData: EventEmitter<{ obj:any,action:any }> = new EventEmitter();


  //table variables
  key!: string;
  orderType!: string;
  filter?: string;
  filterKey?: string;
  pageItems!: number;
  currentPage!: number;
  totalPages!: number[];
  pages!: number[];
  action = MyTableActionEnum;


  //table icons
  faArrowUp = faArrowUp;
  faArrowDown: IconDefinition = faArrowDown;

  //table buttons
  cancelButtonConfig: CustomButtonConfig = cancel;
  backButtonConfig: CustomButtonConfig = back;
  nextButtonConfig: CustomButtonConfig = next;
  previousButtonConfig: CustomButtonConfig = previous;
  addBookConfig: CustomButtonConfig = addCar;
  addUserConfig: CustomButtonConfig = addUser;
  cancelBookConfig: CustomButtonConfig = cancelBooking;
  deleteUserConfig: CustomButtonConfig = deleteUser;
  modifyBookingConfig: CustomButtonConfig = modifyBooking;
  modifyUserConfig: CustomButtonConfig = changeUserInfo;

  ngOnInit() {

    this.key = this.tableConfig.order.defaultColumn;      //need to initialize these variable on the start
    this.orderType = this.tableConfig.order.orderType;
    this.currentPage = 1;
    this.pageItems = this.tableConfig.pagination.itemPerPage;
    this.totalPages = new Array(Math.ceil(this.data.length / this.pageItems));
    this.getPageRange();
  }

//table methods
  sort(key: string) {
    if (key !== this.key || this.orderType == 'desc') {
      this.key = key
      this.orderType = 'asc'
    } else {
      this.orderType = 'desc'
    }
  }

  getPageRange(): void { //p 1234 n  p 2345 n    p 3456 n
    if (this.currentPage - 1 === 0) {
      this.pages = [this.currentPage, this.currentPage + 1];
    } else if (this.currentPage + 1 === this.totalPages.length + 1) {
      this.pages = [this.currentPage - 1, this.currentPage]
    } else {
      this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    }
  }

  setPage(number: number) {

    if(number <= this.totalPages.length && number >= 1){
      this.currentPage = number;
      this.getPageRange();
    }
  }

  //metodo per muoversi avanti e indietro
  movePage(moveForward: boolean) {
    if (moveForward && this.currentPage <= this.totalPages.length) {
      let nextPage = this.currentPage + 1;
      this.setPage(nextPage);
    } else if (!moveForward && this.currentPage >= 1) {
      let previousPage = this.currentPage - 1;
      this.setPage(previousPage);
    }
  }

  //metodo per ricavare gli Item
  actionMethod(object : any | null,action: any){
    //console.log("Requested action: ", action, obj);
    this.getTableData.emit({obj:object,action:action});
  }

}
