import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import {Observable}                 from 'rxjs/Rx';

//TESTING
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//

import { UserService }    from './user.service';


// Operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CartService {
    private baseUrl: string = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005/cart";

    cart_id : string;
    private dataStore: {
        products: any[]
    };
    private _cart: BehaviorSubject<any[]>;
    cart: Observable<any[]>



    // cart: any = {_id : '', products: []};
    unloopable: boolean = true;

    constructor(private http: Http, public userService: UserService) {
        this.cart_id = '';
        this.dataStore = { products: [] };
        this._cart = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.cart = this._cart.asObservable();
    }   

    get products() {
        return this._cart.asObservable();
    }

    getCart() {
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers });

        this.http.get(`${this.baseUrl}/getUserCart`, options).map(response => response.json()).subscribe(data => {
                this.cart_id = data.cart._id;
                this.dataStore.products = data.cart.products;
                this._cart.next(Object.assign({}, this.dataStore).products);
        }, error => console.log('Could not load products.'));
    }

    // getCart(): Observable<any>{
    //   const sc = this;
    //   if(sc.cart._id == '' && this.unloopable){  
    //     sc.unloopable = false;
    //     //Crear un servicio q devuelva el carrito y sustituir el sig return
    //     let token     = JSON.parse(localStorage.getItem('currentUser')).token;
    //     let headers   = new Headers({ 'Authorization': `JWT ${token}` });
    //     let options   = new RequestOptions({ headers });

    //     return this.http
    //                 .get(`${this.baseUrl}/getUserCart`, options)
    //                 .map((response: Response) => {
    //                     let success = response.json() && response.json().success;
    //                     if (success) {
    //                         sc.cart = response.json() && response.json().cart;
    //                         return {success:true, cart: sc.cart};
    //                     } 
    //                     else {
    //                         // return false to indicate failed
    //                         let msg = response.json() && response.json().msg;
    //                         return response;                            
    //                     }
    //                 });
    //   }
    // }

    getCartId(){
        return this.cart_id;
    }

    addToCart(itemToAdd){
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers }); 
        const sc = this;

        this.http.post(`${this.baseUrl}/addToCart`, itemToAdd, options)
                    .map(response => response.json()).subscribe(data => {

                        let tempStore = this.dataStore.products;//.push(data.products);
                        let flag = true;
                        for(let i = 0; i < tempStore.length; i++){
                            let product = tempStore[i];
                            if(product._id === data.updatedCartProduct._id){
                                flag = false;
                                this.dataStore.products.splice(i, 1);
                                this.dataStore.products.splice(i, 0, data.updatedCartProduct);
                            }
                        }
                        if(flag){
                            this.dataStore.products.push(data.updatedCartProduct);
                        }

                        this._cart.next(Object.assign({}, this.dataStore).products);
                    }, error => console.log('Could not create product.'));


        // return this.http
        //     .post(`${this.baseUrl}/addToCart`, itemToAdd, options)
        //     .map((response: Response) => {
        //         // 
        //         let success = response.json() && response.json().success;
        //         if (success) {
        //             let updatedCartProduct = response.json() && response.json().updatedCartProduct;
        //             console.log(updatedCartProduct);
        //             sc.cart.products.push(updatedCartProduct);
        //             return { success, updatedCartProduct };
        //         } 
        //         else {
        //             // return false to indicate failed
        //             let msg = response.json() && response.json().msg;
        //             return { success, msg };
        //         }
        //     });
    }



    // getCartProductsLength(): Observable<any>{
    //     return Observable.of({success:true, size: this.cart.products.length});
    // }

    logout(){
        this.cart_id = '';
        this.dataStore = { products: [] };
        this._cart = <BehaviorSubject<any[]>>new BehaviorSubject([]);
        this.cart = this._cart.asObservable();
    }

}