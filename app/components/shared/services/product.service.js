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
require('rxjs/add/operator/map');
var ProductService = (function () {
    // Variables for product categories
    function ProductService(http, cartService) {
        this.http = http;
        this.cartService = cartService;
        this.baseUrl = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005";
        this.dataStore = { products: [] };
        this._products = new BehaviorSubject_1.BehaviorSubject([]);
        this.trendingStore = { products: [] };
        this._trending = new BehaviorSubject_1.BehaviorSubject([]);
        this.searchedStore = { products: [] };
        this.filteredStore = { products: [] };
        this._searched = new BehaviorSubject_1.BehaviorSubject([]);
        this.categoriesStore = { categories: [] };
        this._categories = new BehaviorSubject_1.BehaviorSubject([]);
    }
    // This function is used to search a products on a local Store and
    // avoid going to the database
    ProductService.prototype.searchProduct = function (product_id) {
        var productFromTrendy = this.trendy_product(product_id);
        if (productFromTrendy) {
            return productFromTrendy;
        }
        var productFromMines = this.my_product(product_id);
        if (productFromMines) {
            return productFromMines;
        }
        var productFromSearch = this.my_searching(product_id);
        if (productFromSearch) {
            return productFromSearch;
        }
        // not found in local
        return null;
    };
    // This function returns an Obserable of a product searched by id
    // The function first check if the product is in memory else it will
    // go and search it in the database
    ProductService.prototype.getProduct = function (product_id) {
        return this.http
            .get(this.baseUrl + "/products?item=" + product_id)
            .map(function (response) {
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
    // This functions sends a request to the database for adding a new product 
    ProductService.prototype.createProduct = function (product) {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .post(this.baseUrl + "/products", product, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            var success = data.success;
            if (success) {
                var createdProduct = data.createdProduct;
                _this.dataStore.products.push(createdProduct);
                _this._products.next(Object.assign({}, _this.dataStore).products);
            }
            else {
                // return false to indicate failed
                var msg = data.msg;
                return { success: success, msg: msg };
            }
        }, function (error) { return console.log('Could not your load products.'); });
        ;
    };
    // This function Updates a product on the data base
    ProductService.prototype.saveProduct = function (product) {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.put(this.baseUrl + "/products", product, options)
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            var tempStore = _this.dataStore.products; //.push(data.products);
            var flag = true;
            for (var i = 0; i < tempStore.length; i++) {
                var product_1 = tempStore[i];
                if (product_1._id === data.updatedProduct._id) {
                    flag = false;
                    _this.dataStore.products.splice(i, 1);
                    _this.dataStore.products.splice(i, 0, data.updatedProduct);
                }
            }
            if (flag) {
                _this.dataStore.products.push(data.updatedProduct);
            }
            _this._products.next(Object.assign({}, _this.dataStore).products);
            //
            _this.cartService.getCart();
            _this.getTrendyProducts();
        }, function (error) { return console.log('Could not create product.'); });
    };
    Object.defineProperty(ProductService.prototype, "trendy_products", {
        //////////////////////////////////////
        // MANAGE TRENDY PRODUCTS FUNCTIONS //
        //////////////////////////////////////
        // This function returns an Observable of the trendy products
        get: function () {
            return this._trending.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ProductService.prototype.trendy_product = function (id) {
        for (var _i = 0, _a = this.trendingStore.products; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product._id === id) {
                return product;
            }
        }
        return null;
    };
    // This function gets the trendy products from the database
    ProductService.prototype.getTrendyProducts = function () {
        var _this = this;
        var sc = this;
        this.http.get(this.baseUrl + "/products/trendy")
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            var success = data.success;
            if (success) {
                _this.trendingStore.products = data.products;
                _this._trending.next(Object.assign({}, _this.trendingStore).products);
            }
        }, function (error) { return console.log('Could not your load products.'); });
    };
    Object.defineProperty(ProductService.prototype, "my_products", {
        ///////////////////////////////////////////////
        // MANAGE CREATED (OWNER) PRODUCTS FUNCTIONS //
        ///////////////////////////////////////////////
        // This function returns an Observable of the products created by the logued in user
        get: function () {
            return this._products.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // This function returns a product located by id in the dataStore of products
    ProductService.prototype.my_product = function (id) {
        for (var _i = 0, _a = this.dataStore.products; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product._id === id) {
                return product;
            }
        }
        return null;
    };
    // This function gets the products created by the logued in user from the database
    ProductService.prototype.getMyProducts = function () {
        var _this = this;
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new http_1.Headers({ 'Authorization': "JWT " + token });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(this.baseUrl + "/products/myProducts", options)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.dataStore.products = data.products;
            _this._products.next(Object.assign({}, _this.dataStore).products);
        }, function (error) { return console.log('Could not your load products.'); });
    };
    Object.defineProperty(ProductService.prototype, "my_search", {
        ////////////////////////////////////////
        // MANAGE SEARCHED PRODUCTS FUNCTIONS //
        ////////////////////////////////////////
        // This function returns an Observable of the products created by the logued in user
        get: function () {
            return this._searched.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // This function returns a product located by id in the dataStore of products
    ProductService.prototype.my_searching = function (id) {
        for (var _i = 0, _a = this.searchedStore.products; _i < _a.length; _i++) {
            var product = _a[_i];
            if (product._id === id) {
                return product;
            }
        }
        return null;
    };
    // This function gets the products searched by an user from the database
    ProductService.prototype.searchProducts = function (search, category) {
        var _this = this;
        var searchingURL = "?search=" + search;
        if (category != '') {
            searchingURL = "?search=" + search + "&category=" + category;
        }
        this.http.get(this.baseUrl + "/search" + searchingURL)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.searchedStore.products = data.products;
            _this.filteredStore.products = data.products;
            _this._searched.next(Object.assign({}, _this.searchedStore).products);
        }, function (error) { return console.log('Could not search any products.'); });
    };
    ProductService.prototype.filterProducts = function (discountsFilter, categoriesFilters, stylesFilters, statesFilter) {
        var products = this.searchedStore.products;
        // Discunt Filter
        var discountProducts = products.filter(function (product) {
            var attributes = product.attributes;
            var filteredAttributes = attributes.filter(function (attribute) {
                // On the attribute I will check the filtes of discount, style and state
                var discountFlag = false;
                var styleFlag = false;
                var stateFlag = false;
                // Filter of discounts
                if (discountsFilter.length > 0) {
                    for (var i = 0; i < discountsFilter.length; i += 2) {
                        var low = discountsFilter[i];
                        var high = discountsFilter[i + 1];
                        if (attribute.discount >= low && attribute.discount < high) {
                            discountFlag = true;
                        }
                    }
                }
                else {
                    discountFlag = true;
                }
                // Filter of styles
                if (stylesFilters.length > 0) {
                    for (var i = 0; i < stylesFilters.length; i += 2) {
                        var tempStyle = stylesFilters[i];
                        if (attribute.style == tempStyle) {
                            styleFlag = true;
                        }
                    }
                }
                else {
                    styleFlag = true;
                }
                // Filter of states
                if (statesFilter.length > 0) {
                    for (var i = 0; i < statesFilter.length; i += 2) {
                        var tempState = statesFilter[i];
                        if (attribute.state == tempState) {
                            stateFlag = true;
                        }
                    }
                }
                else {
                    stateFlag = true;
                }
                return discountFlag && styleFlag && stateFlag;
            });
            var product_categories = product.categories;
            var filteredCategories = product_categories.filter(function (category) {
                if (categoriesFilters.length > 0) {
                    for (var i = 0; i < categoriesFilters.length; i++) {
                        var cat = categoriesFilters[i];
                        if (category == cat) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            });
            if (filteredAttributes.length > 0 && filteredCategories.length > 0) {
                return true;
            }
            else {
                return false;
            }
        });
        this.filteredStore.products = discountProducts;
        this._searched.next(Object.assign({}, this.filteredStore).products);
    };
    Object.defineProperty(ProductService.prototype, "categories", {
        /////////////////////////////////
        // MANAGE CATEGORIES FUNCTIONS //
        /////////////////////////////////
        // This function returns an Observable of the categories available
        get: function () {
            return this._categories.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // This function gets all the categories of the products from the database
    ProductService.prototype.getCategories = function () {
        var _this = this;
        this.http.get(this.baseUrl + "/products/categories")
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            if (data.success) {
                _this.categoriesStore.categories = data.categories;
                _this._categories.next(Object.assign({}, _this.categoriesStore).categories);
            }
        }, function (error) { return console.log('Could not get the categories.'); });
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, cart_service_1.CartService])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map