"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var cart_service_1 = require('./cart.service');
// Operators
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var OrdersService = (function () {
    function OrdersService(http, cartService) {
        this.http = http;
        this.cartService = cartService;
        this.baseUrl = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005/orders";
        this.ordersStore = { orders: [] };
        this._orders = new BehaviorSubject_1.BehaviorSubject([]);
    }
    Object.defineProperty(OrdersService.prototype, "orders", {
        get: function () {
            return this._orders.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    OrdersService.prototype.getOrders = function () {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(this.baseUrl + "/getUserOrders", options).map(function (response) { return response.json(); }).subscribe(function (data) {
            _this.ordersStore.orders = data.orders;
            _this._orders.next(Object.assign({}, _this.ordersStore).orders);
        }, function (error) { return console.log('Could not load orders.'); });
    };
    OrdersService.prototype.addOrders = function () {
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        var sc = this;
        var orders = this.cartService.products;
        var cart_id = this.cartService.getCartId();
        var ordersToAdd = [];
        // for(let order of orders){
        console.log(orders);
        // if(order.attribute.active){
        //     ordersToAdd.push({
        //             "p_name"    : order.product.name,
        //             "p_picture" : order.product.pictures[0],
        //             "p_price"   : order.attribute.price,
        //             "p_discount": order.attribute.discount,
        //             "p_state"   : order.attribute.state,
        //             "p_style"   : order.attribute.style,
        //             "p_color"   : order.attribute.color,
        //             "p_size"    : order.attribute.size
        //     });
        // }
        // }
        // this.http.post(`${this.baseUrl}/addOrders`, {cart_id, ordersToAdd}, options)
        //             .map(response => response.json())
        //             .subscribe(data => {
        //                 let tempStore = this.ordersStore.orders;
        //                 this.ordersStore.orders.push(tempStore);
        //                 this._orders.next(Object.assign({}, this.ordersStore).orders);
        //                 this.cartService.getCart();
        //             }, error => console.log('Could not create product.'));
    };
    OrdersService.prototype.logout = function () {
        this.ordersStore = { orders: [] };
        this._orders = new BehaviorSubject_1.BehaviorSubject([]);
    };
    OrdersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, cart_service_1.CartService])
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service..js.map