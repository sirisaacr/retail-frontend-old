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
var router_2 = require('@angular/router');
var forms_1 = require('@angular/forms');
var product_service_1 = require('../shared/services/product.service');
var EditProductComponent = (function () {
    function EditProductComponent(route, router, pfb, productService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.pfb = pfb;
        this.productService = productService;
        this.loading = false;
        this.pictures = [];
        this.categories = [];
        this.product_id = '';
        this.route.params.subscribe(function (params) {
            _this.product_id = params['id'];
        });
    }
    EditProductComponent.prototype.ngOnInit = function () {
        var sc = this;
        this.allcategories = this.productService.categories;
        this.productService.getCategories();
        var tempProduct = this.productService.searchProduct(sc.product_id);
        if (!tempProduct) {
            this.productService
                .getProduct(sc.product_id)
                .subscribe(function (data) {
                sc.item = data.product;
                sc.initVariables();
            }, function (error) { return console.log('Could not search any products.'); });
        }
        else {
            sc.item = tempProduct;
            sc.initVariables();
        }
    };
    EditProductComponent.prototype.initVariables = function () {
        var sc = this;
        sc.product = {
            "name": [sc.item.name, forms_1.Validators.required],
            "attributes": sc.pfb.array(sc.initAttributes(sc.item.attributes)),
            "description": [sc.item.description, forms_1.Validators.required],
        };
        sc.formProduct = sc.pfb.group(sc.product);
        sc.categories = sc.item.categories;
        sc.pictures = sc.item.pictures;
    };
    EditProductComponent.prototype.initAttributes = function (originalAttributes) {
        var attributes = [];
        for (var _i = 0, originalAttributes_1 = originalAttributes; _i < originalAttributes_1.length; _i++) {
            var attribute = originalAttributes_1[_i];
            attributes.push(this.pfb.group({
                "_id": attribute._id,
                "price": [attribute.price, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[1-9][0-9]*(\.[0-9]+)*")])],
                "discount": [attribute.discount, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+")])],
                "stock": [attribute.stock, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+")])],
                "state": [attribute.state, forms_1.Validators.required],
                "style": [attribute.style, forms_1.Validators.required],
                "color": [attribute.color, forms_1.Validators.required],
                "size": [attribute.size, forms_1.Validators.required],
                "active": attribute.active
            }));
        }
        return attributes;
    };
    EditProductComponent.prototype.initAttribute = function () {
        this.attribute = {
            "_id": '',
            "price": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+(\.[0-9]+)*")])],
            "discount": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+")])],
            "stock": [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]+")])],
            "state": [null, forms_1.Validators.required],
            "style": [null, forms_1.Validators.required],
            "color": ['', forms_1.Validators.required],
            "size": ['', forms_1.Validators.required],
            "active": true
        };
        return this.pfb.group(this.attribute);
    };
    EditProductComponent.prototype.addAttribute = function () {
        var control = this.formProduct.controls['attributes'];
        control.push(this.initAttribute());
    };
    EditProductComponent.prototype.removeAttribute = function (i) {
        var control = this.formProduct.controls['attributes'];
        control.removeAt(i);
    };
    EditProductComponent.prototype.deactivateAttribute = function (i) {
        var control = this.formProduct.controls['attributes'];
        control.at(i).value.active = !control.at(i).value.active;
    };
    EditProductComponent.prototype.categoryAddSubs = function (index, flag) {
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
    EditProductComponent.prototype.saveProduct = function () {
        var _this = this;
        this.loading = true;
        var product = this.formProduct.value;
        product._id = this.product_id;
        product.pictures = this.pictures;
        product.categories = this.categories;
        this.productService.saveProduct(product);
        setTimeout(function () {
            _this.loading = false;
            _this.router.navigate(['/my_products']);
        }, 3000);
    };
    EditProductComponent.prototype.fileChange = function (input) {
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
    EditProductComponent.prototype.resize = function (img, MAX_WIDTH, MAX_HEIGHT) {
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
    EditProductComponent.prototype.selected = function (category_id) {
        for (var _i = 0, _a = this.categories; _i < _a.length; _i++) {
            var category = _a[_i];
            if (category === category_id) {
                return true;
            }
        }
        return false;
    };
    EditProductComponent = __decorate([
        core_1.Component({
            selector: 'my-edit-product',
            templateUrl: 'app/components/edit_product/edit_product.template.html'
        }), 
        __metadata('design:paramtypes', [router_2.ActivatedRoute, router_1.Router, forms_1.FormBuilder, product_service_1.ProductService])
    ], EditProductComponent);
    return EditProductComponent;
}());
exports.EditProductComponent = EditProductComponent;
//# sourceMappingURL=edit_product.component.js.map