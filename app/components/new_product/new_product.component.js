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
        this.loading = false;
        this.pictures = [];
        this.categories = [];
        this.product = {
            "name": ['', forms_1.Validators.required],
            "attributes": this.pfb.array([
                this.initAttribute()
            ]),
            "description": ['', forms_1.Validators.required],
        };
        this.formProduct = this.pfb.group(this.product);
    }
    NewProductComponent.prototype.ngOnInit = function () {
        var sc = this;
        this.allcategories = this.productService.categories;
        this.productService.getCategories();
    };
    NewProductComponent.prototype.initAttribute = function () {
        this.attribute = {
            "_id": '',
            "price": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[1-9][0-9]*(\.[0-9]+)*")])],
            "discount": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+")])],
            "stock": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+")])],
            "state": [null, forms_1.Validators.required],
            "style": [null, forms_1.Validators.required],
            "color": ['', forms_1.Validators.required],
            "size": ['', forms_1.Validators.required]
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
        var id = this.allcategories.source._value[index]._id;
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
        var _this = this;
        this.loading = true;
        var sc = this;
        var product = this.formProduct.value;
        product.pictures = this.pictures;
        product.categories = this.categories;
        this.productService.createProduct(product);
        setTimeout(function () {
            _this.loading = false;
            _this.router.navigate(['/my_products']);
        }, 3000);
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
        if (MAX_WIDTH === void 0) { MAX_WIDTH = 300; }
        if (MAX_HEIGHT === void 0) { MAX_HEIGHT = 300; }
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