import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions} from '@angular/http'

/*
  Generated class for the BackendServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BackendServiceProvider {
  data;
  host = "http://localhost:8080" //"http://10.0.2.2:8080"

  constructor(private http: Http) {
  }

  loadRecipes() {
    return new Promise((resolve, reject) => {
      this.http.get(this.host+'/getrecipes')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }), function (error) {
        reject(error);
      };
    });
  }

  sentOrder(ingredients, userId){
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let postParams = {
        title: 'foo',
        body: 'bar',
        userId: 1
      }

      this.http.post(this.host+'/orderdrinks', postParams, options)
        .subscribe(data => {
          resolve(data);
          console.log(data['_body']);
        }, error => {
          reject(error);
        });
    });
  }

  loadRecipe(id: String) {
    return new Promise((resolve, reject) => {
      this.http.get(this.host+'/getrecipes?id=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }), function (error) {
        reject(error);
      };
    });
  }

  loadBottles() {
    return new Promise((resolve, reject) => {
      this.http.get(this.host+'/getbottles')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }), function (error) {
        reject(error);
      };

    });
  }
}
