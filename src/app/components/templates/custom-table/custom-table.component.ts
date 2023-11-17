import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomTableConfig} from "./custom-table.config";
import {faArrowAltCircleLeft, faArrowDown, faArrowUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {
  cancel,
  CustomButtonConfig,
  next,
  previous
} from "../custom-button/custom-button.config";
import * as _ from "lodash";
export interface TableEmit{
  obj: any;
  action: any;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() tableConfig!: CustomTableConfig;

  @Input() data!: any[];

  @Output() getTableData: EventEmitter<TableEmit> = new EventEmitter();


  //table variables
  key!: string;
  orderType!: string;
  filter?: string;
  filterKey?: string;
  pageItems!: number;
  currentPage!: number;
  totalPages!: number[];
  pages!: number[];

  //table icons
  faArrowUp = faArrowUp;
  faArrowDown: IconDefinition = faArrowDown;

  //table buttons
  cancelButtonConfig: CustomButtonConfig = cancel;
  nextButtonConfig: CustomButtonConfig = next;
  previousButtonConfig: CustomButtonConfig = previous;


  constructor() {
  }


  ngOnInit() {

    this.key = this.tableConfig.order.defaultColumn;      //need to initialize these variable on the start
    this.orderType = this.tableConfig.order.orderType;
    this.currentPage = 1;
    this.pageItems = this.tableConfig.pagination.itemPerPage;
    console.log("Data Received:");
    console.log(this.data);
    if(this.data !== undefined || true){
      this.totalPages = new Array(Math.ceil(this.data!.length / this.pageItems));
    }else{
      this.totalPages = new Array(0);
    }
    this.getPageRange();
    console.log(this.pages.length);
  }



//table methods
  sort(key: any) {
    if (key !== this.key || this.orderType == 'desc') {
      this.key = key
      this.orderType = 'asc'
    } else {
      this.orderType = 'desc'
    }
  }

  getPageRange(): void {  // il simbolo p! indica pagina corrente, |p pagina iniziale, p| pagina finale

    if(this.totalPages.length>=4){ //ci assicuriamo che ci siano piu' di 2 pagine
    if (this.currentPage === 1) { //siamo alla prima pagina                             |p!p p .. p|
      this.pages = [this.currentPage + 1, this.currentPage + 2];
    }
    else if (this.currentPage === this.totalPages.length) { //siamo all'ultima pagina   |p.. p p p!|
      this.pages = [this.currentPage - 2, this.currentPage -1]
    }
    else if(this.currentPage === 2){ //                                                 |p p! p .. p|
      this.pages = [this.currentPage, this.currentPage+1]
    }
    else if(this.currentPage === this.totalPages.length-1){ //                          |p.. p p! p|
      this.pages = [this.currentPage -1, this.currentPage]
    }
    else if(this.currentPage > 2 && this.currentPage<this.totalPages.length-1){ //      |p ..p p! p.. p|
      this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    }
  }
  else if(this.totalPages.length === 3){//                                              |p p! p|
    if(this.currentPage === 1){
      this.pages = [this.currentPage + 1]
    }else if(this.currentPage === 3){
      this.pages = [this.currentPage - 1]
    }else{
      this.pages = [this.currentPage]
    }

  }
  else{//                                                                               |p p|
    this.pages = [];
  }

    console.log(this.pages);
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

  getValue(obj:any, str:any){
    return _.get(obj,str);
  }

  protected readonly faArrowAltCircleLeft = faArrowAltCircleLeft;
}
