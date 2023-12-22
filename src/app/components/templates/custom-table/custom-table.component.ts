import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomTableConfig} from "./custom-table.config";
import {faArrowDown, faArrowUp, faCheck, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {cancel, CustomButtonConfig, next, previous} from "../custom-button/custom-button.config";
import * as _ from "lodash";
import {MyActionEvent} from "./table-details/my-action-event";
import {MyTableActionEnum} from "./table-details/my-actions";

export interface TableEmit{
  obj: any;
  action: any;
}

export interface ImageEmit{
  data: any;
  id: any;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() tableConfig!: CustomTableConfig;

  @Input() data!: any[];

  @Input() categories?: any[];
  @Input() specificCategories?: any[];

  @Output() getTableData: EventEmitter<TableEmit> = new EventEmitter();

  @Output() sendImage: EventEmitter<ImageEmit> = new EventEmitter();


  //table variables
  key!: string;
  orderType!: string;
  filter?: string;
  filterKey?: string;
  categoryFilterKey?: string;
  categoryFilter?: string;
  categoryValue?: string;
  pageItems!: number;
  currentPage!: number;
  totalPages!: number[];
  pages!: number[];
  currentObj?: number;
  categoryLabel?: string;
  categoryAttribute?: string;
  getAttributes: MyActionEvent = {
    action: MyTableActionEnum.SET_ATTRIBUTES
  }
  getCars: MyActionEvent ={
    action: MyTableActionEnum.GET_CATEGORY_CARS
  }

  //table icons
  faArrowUp = faArrowUp;
  faArrowDown: IconDefinition = faArrowDown;

  //table buttons
  cancelButtonConfig: CustomButtonConfig = cancel;
  nextButtonConfig: CustomButtonConfig = next;
  previousButtonConfig: CustomButtonConfig = previous;

  public onFileChanged(event: any, id:any){

    this.sendImage.emit({data:event.target.files[0],id:id})
  }

  public openFile(fileInput: any){
    fileInput.click();
  }

  constructor() {
  }


  ngOnInit() {


    this.categoryFilterKey = ''
    this.filterKey=this.tableConfig.headers[0].key;
    this.key = this.tableConfig.order.defaultColumn;
    this.orderType = this.tableConfig.order.orderType;
    this.currentPage = 1;
    this.pageItems = this.tableConfig.pagination.itemPerPage;
    if(this.data !== undefined || true){
      this.totalPages = new Array(Math.ceil(this.data!.length / this.pageItems));
    }else{
      this.totalPages = new Array(0);
    }
    this.getPageRange();
  }

//table methods
  sort(key: any): void {
    if (key !== this.key || this.orderType == 'desc') {
      this.key = key
      this.orderType = 'asc'
    } else {
      this.orderType = 'desc'
    }
  }

  getPageRange(): void {

    if(this.totalPages.length>=4){
    if (this.currentPage === 1) {                               //siamo alla prima pagina
      this.pages = [this.currentPage + 1, this.currentPage + 2];
    }
    else if (this.currentPage === this.totalPages.length) {     //siamo all'ultima pagina
      this.pages = [this.currentPage - 2, this.currentPage -1]
    }
    else if(this.currentPage === 2){                            //siamo alla seconda pagina
      this.pages = [this.currentPage, this.currentPage+1]
    }
    else if(this.currentPage === this.totalPages.length-1){     //siamo alla penultima pagina
      this.pages = [this.currentPage -1, this.currentPage]
    }
    else if(this.currentPage > 2 && this.currentPage<this.totalPages.length-1){  // la pagina è ovunque in mezzo
      this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1]
    }
  }
  else if(this.totalPages.length === 3){
    if(this.currentPage === 1){
      this.pages = [this.currentPage + 1]
    }else if(this.currentPage === 3){
      this.pages = [this.currentPage - 1]
    }else{
      this.pages = [this.currentPage]
    }

  } else{//  ci sono meno di tre pagine
    this.pages = [];
  }
  }

  setPage(number: number) : void {

    if(number <= this.totalPages.length && number >= 1){
      this.currentPage = number;
      this.getPageRange();
    }
  }

  //metodo per muoversi avanti e indietro
  movePage(moveForward: boolean): void {
    if (moveForward && this.currentPage <= this.totalPages.length) {
      let nextPage = this.currentPage + 1;
      this.setPage(nextPage);
    } else if (!moveForward && this.currentPage >= 1) {
      let previousPage = this.currentPage - 1;
      this.setPage(previousPage);
    }
  }

  //metodo per ricavare gli Item
  actionMethod(object : any | null,action: any): void{
    this.filter = undefined;
    this.getTableData.emit({obj:object,action:action});
  }

  getValue(obj:any, str:any): any{


    return _.get(obj,str);
  }


  protected readonly faCheck = faCheck;
}
