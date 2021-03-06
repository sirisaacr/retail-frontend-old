import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import {Observable}                 from 'rxjs/Rx';

// Operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  private baseUrl: string = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005/user";

  public token: string;
  public type: boolean;
 
  constructor(private http: Http) {
      // set token if saved in local storage
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.type = currentUser && currentUser.type;
  }

  login(user): Observable<any> {
    //   let user = { "username" : username, "password": password};
    const sc = this;
    return this.http
            .post(`${this.baseUrl}/authenticate`, user )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let success = response.json() && response.json().success;
                if (success) {
                    let token = response.json() && response.json().token;
                    sc.token = token;
                    let type = response.json() && response.json().type;
                    sc.type = type;

                    localStorage.setItem('currentUser', JSON.stringify({ type: type, token: token }));
                    return { success: true };
                } else {
                    // return false to indicate failed login
                    let msg = response.json() && response.json().msg;
                    return { success: false, msg};
                }
            });
  }

  register(user): Observable<any> {
    return this.http
            .post(`${this.baseUrl}/signup`, user)
            .map((response: Response) => {
                let success = response.json() && response.json().success;
                if (success) {
                    // return true to indicate successful register
                    return { success: true };
                } else {
                    // return false to indicate failed register
                    let msg = response.json() && response.json().msg;
                    return { success: false, msg};
                }
            });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isSeller(){
      return this.type;
  }

  isLoggedIn() {
      return this.token;
    // if(this.token){
    //     return Observable.of({success: true});
    // }
    // else{
    //     return Observable.of({success: false});
    // }
  }

}