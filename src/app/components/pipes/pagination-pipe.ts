import {Pipe, PipeTransform} from "@angular/core";


@Pipe({ name: 'paginationPipe'})
export class PaginationPipe implements PipeTransform {
  transform(data: any[], currentPage: number, pageItems: number): any[] {
    let startItem: number = (currentPage - 1) * pageItems
    let endItem: number = startItem + pageItems
    return data.slice(startItem,endItem)
  }
}
