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
var orders_service_1 = require('../shared/services/orders.service');
var OrdersComponent = (function () {
    function OrdersComponent(ordersService) {
        this.ordersService = ordersService;
    }
    OrdersComponent.prototype.ngOnInit = function () {
        this.orders = this.ordersService.orders;
        this.ordersService.getOrders();
    };
    OrdersComponent.prototype.getTotalOfOrder = function (index) {
        var products = this.orders.source._value[index].products;
        var price = 0;
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            price += (product.p_price - product.p_price * product.p_discount / 100) * product.p_quantity;
        }
        return price;
    };
    OrdersComponent = __decorate([
        core_1.Component({
            selector: 'my-orders',
            templateUrl: 'app/components/orders/orders.template.html'
        }), 
        __metadata('design:paramtypes', [orders_service_1.OrdersService])
    ], OrdersComponent);
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=orders.component.js.map