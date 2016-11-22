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
var user_service_1 = require('../shared/services/user.service');
var cart_service_1 = require('../shared/services/cart.service');
var product_service_1 = require('../shared/services/product.service');
var HeaderComponent = (function () {
    function HeaderComponent(router, cartService, productService, userService) {
        this.router = router;
        this.cartService = cartService;
        this.productService = productService;
        this.userService = userService;
        this.flag = true;
        this.search = '';
        this.searchCategory = '';
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.categories = this.productService.categories;
        this.productService.getCategories();
    };
    HeaderComponent.prototype.isLoggedIn = function () {
        var flag = this.userService.isLoggedIn();
        return flag;
    };
    HeaderComponent.prototype.isSeller = function () {
        var flag = this.userService.isSeller();
        return flag;
    };
    HeaderComponent.prototype.validation = function () {
        if (this.isLoggedIn() && this.flag) {
            this.flag = false;
            this.cart = this.cartService.products;
            this.cartService.getCart();
            return true;
        }
        else if (this.isLoggedIn() && !this.flag) {
            return true;
        }
    };
    HeaderComponent.prototype.logout = function () {
        this.flag = true;
        this.userService.logout();
        this.cartService.logout();
    };
    HeaderComponent.prototype.searchProducts = function () {
        this.productService.searchProducts(this.search, this.searchCategory);
        if (this.searchCategory != '') {
            this.router.navigate(['/search'], { queryParams: { search: this.search, category: this.searchCategory } });
        }
        else {
            this.router.navigate(['/search'], { queryParams: { search: this.search } });
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'my-header',
            templateUrl: 'app/components/header/header.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, cart_service_1.CartService, product_service_1.ProductService, user_service_1.UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map