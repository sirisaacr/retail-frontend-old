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
var user_service_1 = require('../shared/services/user.service');
var NewProductComponent = (function () {
    function NewProductComponent(router, pfb, productService, userService) {
        this.router = router;
        this.pfb = pfb;
        this.productService = productService;
        this.userService = userService;
        this.pictures = [];
        this.attribute = {};
        this.allcategories = [];
        this.categories = [];
        this.product = {
            "name": '',
            "seller": '',
            "created": '',
            "attributes": this.pfb.array([
                this.initAttribute()
            ]),
            "description": ''
        };
        this.formProduct = this.pfb.group(this.product);
    }
    NewProductComponent.prototype.ngOnInit = function () {
        var sc = this;
        var cal = this.productService.categoriesList().subscribe(function (result) {
            if (result.success) {
                sc.allcategories = result.categories;
            }
        });
        // this.userService.canIbe().subscribe((result) => {
        //   if (result.success) {
        //     sc.allcategories = result.categories; 
        //   }
        // });
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
        return this.pfb.group(this.attribute);
    };
    NewProductComponent.prototype.addAttribute = function () {
        var control = this.formProduct.controls['attributes'];
        control.push(this.initAttribute());
    };
    NewProductComponent.prototype.removeAtrribute = function (i) {
        var control = this.formProduct.controls['attributes'];
        control.removeAt(i);
    };
    NewProductComponent.prototype.categoryAddSubs = function (index, flag) {
        var id = this.allcategories[index]._id;
        if (flag) {
            this.categories.push(id);
        }
        else {
            var length_1 = this.categories.length;
            for (var i = 0; i < length_1; i++) {
                var _id = this.categories[i];
                if (_id === id) {
                    this.categories.splice(i, 1);
                }
            }
        }
    };
    NewProductComponent.prototype.createProduct = function () {
        var sc = this;
        var product = this.formProduct.value;
        product.pictures = this.pictures;
        product.categories = this.categories;
        this.productService.createProduct(product).subscribe(function (result) {
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
    NewProductComponent.prototype.fileChange = function (input) {
        var _this = this;
        for (var i = 0; i < input.files.length; i++) {
            // Create an img element and add the image file data to it
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(input.files[i]);
            // Create a FileReader
            var target;
            var reader = new FileReader();
            // Add an event listener to deal with the file when the reader is complete
            reader.addEventListener("load", function (event) {
                // Get the event.target.result from the reader (base64 of the image)
                img.src = event.target.result;
                var resized_img = _this.resize(img);
                _this.pictures.push(resized_img);
            }, false);
            reader.readAsDataURL(input.files[i]);
        }
    };
    NewProductComponent.prototype.resize = function (img, MAX_WIDTH, MAX_HEIGHT) {
        if (MAX_WIDTH === void 0) { MAX_WIDTH = 200; }
        if (MAX_HEIGHT === void 0) { MAX_HEIGHT = 200; }
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        }
        else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/png');
        return dataUrl;
    };
    NewProductComponent = __decorate([
        core_1.Component({
            selector: 'my-new-product',
            templateUrl: 'app/components/new_product/new_product.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, product_service_1.ProductService, user_service_1.UserService])
    ], NewProductComponent);
    return NewProductComponent;
}());
exports.NewProductComponent = NewProductComponent;
//# sourceMappingURL=new_product.component.js.map