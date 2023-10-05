import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: "searchingPipe"})
export class SearchingPipe implements PipeTransform {

  transform(data: any[], filter?: string, key?: string): any {
    if (data.length === 0 || !filter || !key){
      return data;
    }
    let filteredData: any[] = [];
    console.log(filter,key,data);
    for(let object of data){
      if (object[key].toString().toLowerCase().includes(filter.toLowerCase())) {
        filteredData.push(object);
      }
    }
    console.log(filter,key,filteredData);
    return filteredData;
  }
}
