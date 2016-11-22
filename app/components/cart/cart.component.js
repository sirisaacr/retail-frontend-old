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
var orders_service_1 = require('../shared/services/orders.service');
var cart_service_1 = require('../shared/services/cart.service');
var CartComponent = (function () {
    function CartComponent(router, ordersService, cartService) {
        this.router = router;
        this.ordersService = ordersService;
        this.cartService = cartService;
        this.loading = false;
    }
    CartComponent.prototype.ngOnInit = function () {
        this.cart = this.cartService.products;
    };
    CartComponent.prototype.getCartTotal = function () {
        var tempTotal = 0;
        for (var _i = 0, _a = this.cart.source._value; _i < _a.length; _i++) {
            var item = _a[_i];
            tempTotal += (item.attribute.price - item.attribute.price * item.attribute.discount / 100) * item.quantity;
        }
        return tempTotal;
    };
    CartComponent.prototype.proceedToBuy = function () {
        var _this = this;
        this.loading = true;
        this.ordersService.addOrders();
        setTimeout(function () {
            _this.loading = false;
            _this.router.navigate(['/orders']);
        }, 500);
    };
    CartComponent = __decorate([
        core_1.Component({
            selector: 'my-cart',
            templateUrl: 'app/components/cart/cart.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, orders_service_1.OrdersService, cart_service_1.CartService])
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map