import { Pipe } from "@angular/core";

@Pipe({
  name: "bytOrderBy"
})
export class BYTOrderByPipe {

  transform(value) {
     value.sort(function(a, b){
       return b.total - a.total;
     });
    return value;
  }
}