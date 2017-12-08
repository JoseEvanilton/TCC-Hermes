
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  public apiUrl = 'https://hermes-d165c.firebaseio.com/profile.json';  
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  getUsuario(): Observable<string[]> {
    return this.http.get(this.apiUrl)
    .map(this.extractData)
    .catch(this.handleError);
    }
   
   private extractData(res: Response) {
    let body = res.json();
    return body || { };
    }
   
   private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
    errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
    }
}


