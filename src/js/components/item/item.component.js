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
var ItemComponent = (function () {
    function ItemComponent(router, productService) {
        this.router = router;
        this.productService = productService;
    }
    ItemComponent.prototype.ngOnInit = function () {
        var attributes = this.item.attributes;
        attributes.sort(function (a, b) {
            var priceA = a.price, discoA = a.discount, priceB = b.price, discoB = b.discount;
            var finalA = priceA - (priceA * (discoA / 100)), finalB = priceB - (priceB * (discoB / 100));
            return finalA - finalB;
        });
        this.item.attributes = attributes;
        var attr = attributes[0];
        if (attr.discount > 0) {
            this.finalPrice = attr.price - attr.price * (attr.discount / 100);
        }
        else {
            this.finalPrice = attributes[0].price;
        }
    };
    ItemComponent.prototype.sale = function () {
        var attr = this.item.attributes[0];
        return (attr.discount > 0);
    };
    ItemComponent.prototype.setCurrentProduct = function () {
        var sc = this;
        this.productService.setCurrentProduct(this.item)
            .subscribe(function (result) {
            if (result.success) {
                sc.router.navigate(['/product', sc.item._id]);
                ;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ItemComponent.prototype, "item", void 0);
    ItemComponent = __decorate([
        core_1.Component({
            selector: 'my-item',
            templateUrl: 'app/components/item/item.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, product_service_1.ProductService])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map