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
var user_service_1 = require('../shared/services/user.service');
var cart_service_1 = require('../shared/services/cart.service');
var ProductComponent = (function () {
    function ProductComponent(router, route, productService, cartService, userService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.productService = productService;
        this.cartService = cartService;
        this.userService = userService;
        this.loading = false;
        this.Interval = 5000;
        this.noWrapSlides = false;
        this.product = {};
        this.tempAtrr = {};
        this.pictures = [];
        this.attributes = [];
        this.tempBuy = [];
        this.route.params.subscribe(function (params) {
            _this.product_id = params['id'];
        });
    }
    ProductComponent.prototype.ngOnInit = function () {
        var sc = this;
        var tempProduct = this.productService.searchProduct(sc.product_id);
        if (!tempProduct) {
            tempProduct = this.productService
                .getProduct(sc.product_id)
                .subscribe(function (data) {
                sc.initVariables(data.product);
            }, function (error) { return console.log('Could not search any products.'); });
        }
        else {
            sc.initVariables(tempProduct);
        }
    };
    ProductComponent.prototype.initVariables = function (product) {
        var sc = this;
        sc.product = product;
        sc.pictures = product.pictures;
        sc.attributes = product.attributes;
        for (var i = 0; i < sc.attributes.length; i++) {
            var tempAttribute = {
                product_id: sc.product._id,
                attribute_id: sc.attributes[i]._id,
                quantity: 0
            };
            sc.tempBuy.push(tempAttribute);
        }
        var attributes = sc.attributes;
        attributes.sort(function (a, b) {
            var priceA = a.price, discoA = a.discount, priceB = b.price, discoB = b.discount;
            var finalA = priceA - (priceA * (discoA / 100)), finalB = priceB - (priceB * (discoB / 100));
            return finalA - finalB;
        });
        sc.attributes = attributes;
    };
    ProductComponent.prototype.increaseQuantityOfTempBuy = function (index) {
        var stock = this.attributes[index].stock;
        var actualQuantity = this.tempBuy[index].quantity;
        if (stock > actualQuantity) {
            this.tempBuy[index].quantity = actualQuantity + 1;
        }
    };
    ProductComponent.prototype.decreaseQuantityOfTempBuy = function (index) {
        var actualQuantity = this.tempBuy[index].quantity;
        if (0 < actualQuantity) {
            this.tempBuy[index].quantity = actualQuantity - 1;
        }
    };
    ProductComponent.prototype.addToCart = function (index) {
        var _this = this;
        this.loading = true;
        if (this.userService.isLoggedIn()) {
            var product = this.tempBuy[index];
            var purchase = {
                cart: this.cartService.getCartId(),
                product: {
                    product: this.product_id,
                    attribute: product.attribute_id,
                    quantity: product.quantity
                }
            };
            this.cartService.addToCart(purchase);
            this.tempBuy[index].quantity = 0;
            setTimeout(function () {
                _this.loading = false;
            }, 1000);
        }
        else {
        }
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'my-product',
            templateUrl: 'app/components/product/product.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, product_service_1.ProductService, cart_service_1.CartService, user_service_1.UserService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map