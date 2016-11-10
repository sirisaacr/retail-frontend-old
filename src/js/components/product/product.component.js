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
var ProductComponent = (function () {
    function ProductComponent(route, productService) {
        var _this = this;
        this.route = route;
        this.productService = productService;
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
        var _this = this;
        var sc = this;
        this.productService.getCurrentProduct()
            .subscribe(function (result) {
            if (result.success) {
                sc.initVariables(result.product);
            }
            else {
                _this.productService.getProduct(sc.product_id)
                    .subscribe(function (result) {
                    if (result.success) {
                        sc.initVariables(result.product[0]);
                    }
                });
            }
        });
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
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'my-product',
            templateUrl: 'app/components/product/product.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, product_service_1.ProductService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map