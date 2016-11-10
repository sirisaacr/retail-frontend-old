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
var product_service_1 = require('../shared/services/product.service');
var TrendyComponent = (function () {
    function TrendyComponent(productService) {
        this.productService = productService;
        this.trendyItems = [];
        this.error = '';
    }
    TrendyComponent.prototype.ngOnInit = function () {
        var sc = this;
        sc.productService.trending()
            .subscribe(function (result) {
            if (result.success) {
                sc.trendyItems = result.trending;
            }
            else {
                // trending items failed
                sc.error = result.msg;
            }
        });
    };
    TrendyComponent = __decorate([
        core_1.Component({
            selector: 'my-trendy',
            templateUrl: 'app/components/trendy/trendy.template.html'
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService])
    ], TrendyComponent);
    return TrendyComponent;
}());
exports.TrendyComponent = TrendyComponent;
//# sourceMappingURL=trendy.component.js.map