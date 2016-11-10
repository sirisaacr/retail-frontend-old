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
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.baseUrl = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005";
        this.currentProduct = {};
    }
    ProductService.prototype.setCurrentProduct = function (product) {
        var sc = this;
        return Rx_1.Observable
            .create(function (observer) {
            sc.currentProduct = product;
            if (sc.currentProduct._id) {
                observer.next({ success: true });
                observer.complete();
            }
            else {
                observer.next({ success: false });
                observer.complete();
            }
        });
    };
    ProductService.prototype.getCurrentProduct = function () {
        var sc = this;
        return Rx_1.Observable
            .create(function (observer) {
            var product = sc.currentProduct;
            if (sc.currentProduct._id) {
                observer.next({ success: true, product: product });
                observer.complete();
            }
            else {
                observer.next({ success: false });
                observer.complete();
            }
        });
    };
    ProductService.prototype.getProduct = function (product_id) {
        var sc = this;
        return this.http
            .get(this.baseUrl + "/products?item=" + product_id)
            .map(function (response) {
            // 
            var success = response.json() && response.json().success;
            if (success) {
                var product = response.json() && response.json().product;
                return { success: success, product: product };
            }
            else {
                // return false to indicate failed
                var msg = response.json() && response.json().msg;
                return { success: success, msg: msg };
            }
        });
    };
    ProductService.prototype.trending = function () {
        return this.http
            .get(this.baseUrl + "/products/trendy")
            .map(function (response) {
            // 
            var success = response.json() && response.json().success;
            if (success) {
                var trending = response.json() && response.json().products;
                return { success: success, trending: trending };
            }
            else {
                // return false to indicate failed
                var msg = response.json() && response.json().msg;
                return { success: success, msg: msg };
            }
        });
    };
    ProductService.prototype.createProduct = function (product) {
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .post(this.baseUrl + "/products", product, options)
            .map(function (response) {
            // 
            var success = response.json() && response.json().success;
            if (success) {
                var createdProduct = response.json() && response.json().createdProduct;
                return { success: success, createdProduct: createdProduct };
            }
            else {
                // return false to indicate failed
                var msg = response.json() && response.json().msg;
                return { success: success, msg: msg };
            }
        });
    };
    ProductService.prototype.categoriesList = function () {
        return this.http
            .get(this.baseUrl + "/products/categories")
            .map(function (response) {
            // 
            var success = response.json() && response.json().success;
            if (success) {
                var categories = response.json() && response.json().categories;
                return { success: success, categories: categories };
            }
            else {
                // return false to indicate failed
                var msg = response.json() && response.json().msg;
                return { success: success, msg: msg };
            }
        });
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map