import { Injectable }                 from '@angular/core';
import { Http, Headers, Response, RequestOptions }    from '@angular/http';
import {Observable}                 from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CartService }    from './cart.service';


// Operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrdersService {
    private baseUrl: string = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005/orders";

    private ordersStore: {
        orders: any[]
    };
    private _orders: BehaviorSubject<any[]>;
    cart: any;

    constructor(private http: Http, public cartService: CartService) {
        this.ordersStore = { orders: [] };
        this._orders = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    }   

    get orders() {
        return this._orders.asObservable();
    }

    getOrders() {
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers });

        this.http.get(`${this.baseUrl}/getUserOrders`, options).map(response => response.json()).subscribe(data => {
                this.ordersStore.orders = data.orders;
                this._orders.next(Object.assign({}, this.ordersStore).orders);
        }, error => console.log('Could not load orders.'));
    }

    addOrders(){
        let token     = JSON.parse(localStorage.getItem('currentUser')).token;
        let headers   = new Headers({ 'Authorization': `JWT ${token}` });
        let options   = new RequestOptions({ headers }); 
        const sc = this;

        this.cart = this.cartService.products;
        let cart_id = this.cartService.getCartId();
        let ordersToAdd = [];


        for(let order of this.cart.source.value){
            if(order.attribute.active){
                ordersToAdd.push({
                        "p_id"      : order.product._id,
                        "p_name"    : order.product.name,
                        "p_picture" : order.product.pictures[0],
                        "p_price"   : order.attribute.price,
                        "p_discount": order.attribute.discount,
                        "p_quantity": order.quantity,
                        "p_state"   : order.attribute.state,
                        "p_style"   : order.attribute.style,
                        "p_color"   : order.attribute.color,
                        "p_size"    : order.attribute.size
                });
            }
        }

        this.http.post(`${this.baseUrl}/addOrders`, {cart_id, ordersToAdd}, options)
                    .map(response => response.json())
                    .subscribe(data => {
                        let tempStore = data.order;
                        this.ordersStore.orders.push(tempStore);
                        this._orders.next(Object.assign({}, this.ordersStore).orders);
                        this.cartService.getCart();
                    }, error => console.log('Could not create product.'));
    }

    logout(){
        this.ordersStore = { orders: [] };
        this._orders = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    }

}