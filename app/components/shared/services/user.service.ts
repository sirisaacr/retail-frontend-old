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

  public cart: any = {_id: '', size: 0};
 
  constructor(private http: Http) {
      // set token if saved in local storage
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
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
                    this.token = token;

                    sc.cart = response.json() && response.json().cart;
                    console.log(sc.cart);
                    // set token property
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    let username = user.username;
                    localStorage.setItem('currentUser', JSON.stringify({ username, token }));
                    // return true to indicate successful login
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

  isLoggedIn() {
    return this.token;
  }

  getBasicCart(): Observable<any>{
      const sc = this;
      if(this.isLoggedIn() && sc.cart_id == ''){
            //Crear un servicio q devuelva el carrito y sustituir el sig return
            return Observable.create(function (observer) {
                let cart = sc.cart;
                observer.next({success: true, cart: cart});
                observer.complete();
            });
      }
      else{
        return Observable.create(function (observer) {
                let cart = sc.cart;
                observer.next({success: true, cart: cart});
                observer.complete();
            });
      }
  }

}