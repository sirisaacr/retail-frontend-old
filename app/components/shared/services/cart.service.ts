import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import {Observable}                 from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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



    // cart: any = {_id : '', products: []};
    unloopable: boolean = true;

    constructor(private http: Http, public userService: UserService) {
        this.cart_id = '';
        this.dataStore = { products: [] };
        this._cart = <BehaviorSubject<any[]>>new BehaviorSubject([]);
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

    getCartId(){
        return this.cart_id;
    }

    addToCart(itemToAdd){
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers }); 
        const sc = this;

        this.http.post(`${this.baseUrl}/addToCart`, itemToAdd, options)
                    .map(response => response.json())
                    .subscribe(data => {
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
    }

    removeFromCart(index){
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers }); 
        const sc = this;

        let itemToRemove = { _id: this.dataStore.products[index]._id };

        this.http.post(`${this.baseUrl}/removeFromCart`, itemToRemove, options)
                    .map(response => response.json()).subscribe(data => {
                        if(data.success){
                            this.dataStore.products.splice(index, 1);
                            this._cart.next(Object.assign({}, this.dataStore).products);
                        }
                    }, error => console.log('Could not delete product.'));
    }

    logout(){
        this.cart_id = '';
        this.dataStore = { products: [] };
        this._cart = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    }

}