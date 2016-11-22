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
var router_1 = require('@angular/router');
var product_service_1 = require('../shared/services/product.service');
var SearchedProductsComponent = (function () {
    function SearchedProductsComponent(router, route, productService) {
        this.router = router;
        this.route = route;
        this.productService = productService;
        // Variables to control the filters selected by the user
        this.discountsFilter = [];
        this.categoriesFilter = [];
        this.stylesFilter = [];
        this.statesFilter = [];
        this.search = this.route.snapshot.queryParams['search'];
        this.category = this.route.snapshot.queryParams['category'];
    }
    SearchedProductsComponent.prototype.ngOnInit = function () {
        // Call all the categories form the database
        this.categories = this.productService.categories;
        this.productService.getCategories();
        if (this.search && this.category) {
            this.productService.searchProducts(this.search, this.category);
            this.searchedProducts = this.productService.my_search;
        }
        else if (this.search) {
            this.productService.searchProducts(this.search, '');
            this.searchedProducts = this.productService.my_search;
        }
        else {
            this.router.navigate(['/']);
        }
    };
    SearchedProductsComponent.prototype.editDiscountFilter = function (low, high) {
        var indexOf = this.isValueIn(low, this.discountsFilter);
        if (indexOf >= 0) {
            this.discountsFilter.splice(indexOf, 2);
        }
        else {
            this.discountsFilter.push(low, high);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, this.stylesFilter, this.statesFilter);
    };
    SearchedProductsComponent.prototype.editCategoryFilter = function (id) {
        var indexOf = this.isValueIn(id, this.categoriesFilter);
        if (indexOf >= 0) {
            this.categoriesFilter.splice(indexOf, 1);
        }
        else {
            this.categoriesFilter.push(id);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, this.stylesFilter, this.statesFilter);
    };
    SearchedProductsComponent.prototype.editStyleFilter = function (style) {
        var indexOf = this.isValueIn(style, this.stylesFilter);
        if (indexOf >= 0) {
            this.stylesFilter.splice(indexOf, 1);
        }
        else {
            this.stylesFilter.push(style);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, this.stylesFilter, this.statesFilter);
    };
    SearchedProductsComponent.prototype.editStateFilter = function (state) {
        var indexOf = this.isValueIn(state, this.statesFilter);
        if (indexOf >= 0) {
            this.statesFilter.splice(indexOf, 1);
        }
        else {
            this.statesFilter.push(state);
        }
        this.productService.filterProducts(this.discountsFilter, this.categoriesFilter, this.stylesFilter, this.statesFilter);
    };
    SearchedProductsComponent.prototype.isValueIn = function (value, array) {
        for (var i = 0; i < array.length; i++) {
            var val = array[i];
            if (val == value)
                return i;
        }
        return -1;
    };
    SearchedProductsComponent = __decorate([
        core_1.Component({
            selector: 'my-searched_products',
            templateUrl: 'app/components/searched_products/searched_products.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, product_service_1.ProductService])
    ], SearchedProductsComponent);
    return SearchedProductsComponent;
}());
exports.SearchedProductsComponent = SearchedProductsComponent;
//# sourceMappingURL=searched_products.component.js.map