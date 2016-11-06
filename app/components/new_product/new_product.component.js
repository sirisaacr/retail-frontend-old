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
var forms_1 = require('@angular/forms');
var product_service_1 = require('../shared/services/product.service');
var NewProductComponent = (function () {
    function NewProductComponent(router, pfb, productService) {
        this.router = router;
        this.pfb = pfb;
        this.productService = productService;
        this.attribute = {};
        this.product = {
            "name": '',
            "seller": '',
            "created": '',
            "attributes": this.pfb.array([
                this.initAttribute(),
            ]),
            "categories": this.pfb.array(["580faff81ced8e9a25ddc3b6"]),
            "description": '',
            "pictures": this.pfb.array(["https://cdn.qwertee.com/images/mens-black.png"])
        };
        this.formProduct = this.pfb.group(this.product);
    }
    NewProductComponent.prototype.ngOnInit = function () {
    };
    NewProductComponent.prototype.initAttribute = function () {
        this.attribute = {
            "price": null,
            "discount": null,
            "stock": null,
            "state": null,
            "style": null,
            "color": '',
            "size": ''
        };
        // initialize our address
        return this.pfb.group(this.attribute);
    };
    NewProductComponent.prototype.addAttribute = function () {
        var control = this.formProduct.controls['attributes'];
        control.push(this.initAttribute());
    };
    NewProductComponent.prototype.removeAtrribute = function (i) {
        // remove attribute from the list
        console.log(i);
        var control = this.formProduct.controls['attributes'];
        control.removeAt(i);
    };
    NewProductComponent.prototype.createProduct = function () {
        var sc = this;
        this.productService.createProduct(this.formProduct.value).subscribe(function (result) {
            if (result.success) {
                sc.router.navigate(['/']);
            }
            else {
                // login failed
                var error = result.msg;
                console.log(error);
            }
        });
    };
    NewProductComponent = __decorate([
        core_1.Component({
            selector: 'my-new-product',
            templateUrl: 'app/components/new_product/new_product.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, product_service_1.ProductService])
    ], NewProductComponent);
    return NewProductComponent;
}());
exports.NewProductComponent = NewProductComponent;
//# sourceMappingURL=new_product.component.js.map