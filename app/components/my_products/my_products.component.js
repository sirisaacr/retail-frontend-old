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
var MyProductsComponent = (function () {
    function MyProductsComponent(router, productService) {
        this.router = router;
        this.productService = productService;
    }
    MyProductsComponent.prototype.ngOnInit = function () {
        this.products = this.productService.my_products;
        this.productService.getMyProducts();
    };
    MyProductsComponent = __decorate([
        core_1.Component({
            selector: 'my-products',
            templateUrl: 'app/components/my_products/my_products.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, product_service_1.ProductService])
    ], MyProductsComponent);
    return MyProductsComponent;
}());
exports.MyProductsComponent = MyProductsComponent;
//# sourceMappingURL=my_products.component.js.map