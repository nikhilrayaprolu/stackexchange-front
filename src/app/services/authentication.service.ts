import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {server} from "../config";
@Injectable()
export class AuthenticationService {
  public token: string;
  server = server;
  constructor(private http: Http) {
    // set token if saved in local storage

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  checkuserloggedin() {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.server + '/authentication/authenticate',{ username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
