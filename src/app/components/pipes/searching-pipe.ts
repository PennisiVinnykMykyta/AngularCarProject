import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: "searchingPipe"})
export class SearchingPipe implements PipeTransform {

  transform(data: any[], filter?: string, key?: string): any {
    if (data.length === 0 || !filter || !key){
      return data;
    }

    let filteredData: any[] = [];
    let innerKey: string = key.substring(0,key.indexOf('.'));

    if(innerKey === "user" || innerKey === "car"){
      let innerKeySpec: string = key.substring(key.indexOf('.')+1);
      for(let object of data){
        if (object[innerKey][innerKeySpec].toString().toLowerCase().includes(filter.toLowerCase())) {
          filteredData.push(object);
        }
      }
    }else{
      for(let object of data){
        if (object[key].toString().toLowerCase().includes(filter.toLowerCase())) {
          filteredData.push(object);
        }
      }
    }


    return filteredData;
  }
}
