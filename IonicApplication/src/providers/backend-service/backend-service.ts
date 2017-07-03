import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http'

/*
  Generated class for the BackendServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BackendServiceProvider {
  data;
  constructor(private http: Http) {

  }
  loadRecipe() {
//    if (this.data) {
//       already loaded data
//      return Promise.resolve(this.data);
//    }
    return new Promise(resolve => {
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }
  loadBottles(){
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/getbottles')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }

}
