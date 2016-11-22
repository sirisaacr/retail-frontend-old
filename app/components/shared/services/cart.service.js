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
var user_service_1 = require('./user.service');
// Operators
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var CartService = (function () {
    function CartService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.baseUrl = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005/cart";
        // cart: any = {_id : '', products: []};
        this.unloopable = true;
        this.cart_id = '';
        this.dataStore = { products: [] };
        this._cart = new BehaviorSubject_1.BehaviorSubject([]);
    }
    Object.defineProperty(CartService.prototype, "products", {
        get: function () {
            return this._cart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    CartService.prototype.getCart = function () {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(this.baseUrl + "/getUserCart", options).map(function (response) { return response.json(); }).subscribe(function (data) {
            _this.cart_id = data.cart._id;
            _this.dataStore.products = data.cart.products;
            _this._cart.next(Object.assign({}, _this.dataStore).products);
        }, function (error) { return console.log('Could not load products.'); });
    };
    CartService.prototype.getCartId = function () {
        return this.cart_id;
    };
    CartService.prototype.addToCart = function (itemToAdd) {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        var sc = this;
        this.http.post(this.baseUrl + "/addToCart", itemToAdd, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            var tempStore = _this.dataStore.products; //.push(data.products);
            var flag = true;
            for (var i = 0; i < tempStore.length; i++) {
                var product = tempStore[i];
                if (product._id === data.updatedCartProduct._id) {
                    flag = false;
                    _this.dataStore.products.splice(i, 1);
                    _this.dataStore.products.splice(i, 0, data.updatedCartProduct);
                }
            }
            if (flag) {
                _this.dataStore.products.push(data.updatedCartProduct);
            }
            _this._cart.next(Object.assign({}, _this.dataStore).products);
        }, function (error) { return console.log('Could not create product.'); });
    };
    CartService.prototype.removeFromCart = function (index) {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        var sc = this;
        var itemToRemove = { _id: this.dataStore.products[index]._id };
        this.http.post(this.baseUrl + "/removeFromCart", itemToRemove, options)
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            if (data.success) {
                _this.dataStore.products.splice(index, 1);
                _this._cart.next(Object.assign({}, _this.dataStore).products);
            }
        }, function (error) { return console.log('Could not delete product.'); });
    };
    CartService.prototype.logout = function () {
        this.cart_id = '';
        this.dataStore = { products: [] };
        this._cart = new BehaviorSubject_1.BehaviorSubject([]);
    };
    CartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map