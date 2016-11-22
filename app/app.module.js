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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var app_component_1 = require('./components/app/app.component');
var header_component_1 = require('./components/header/header.component');
var home_component_1 = require('./components/home/home.component');
var footer_component_1 = require('./components/footer/footer.component');
var trendy_component_1 = require('./components/trendy/trendy.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var item_component_1 = require('./components/item/item.component');
var own_item_component_1 = require('./components/own_item/own_item.component');
var searched_products_component_1 = require('./components/searched_products/searched_products.component');
var orders_component_1 = require('./components/orders/orders.component');
var new_product_component_1 = require('./components/new_product/new_product.component');
var edit_product_component_1 = require('./components/edit_product/edit_product.component');
var product_component_1 = require('./components/product/product.component');
var cart_component_1 = require('./components/cart/cart.component');
var my_products_component_1 = require('./components/my_products/my_products.component');
var user_service_1 = require('./components/shared/services/user.service');
var product_service_1 = require('./components/shared/services/product.service');
var cart_service_1 = require('./components/shared/services/cart.service');
var orders_service_1 = require('./components/shared/services/orders.service');
var app_routes_1 = require("./app.routes");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                app_routes_1.default,
                ng2_bootstrap_1.CarouselModule
            ],
            providers: [user_service_1.UserService,
                product_service_1.ProductService,
                cart_service_1.CartService,
                orders_service_1.OrdersService
            ],
            declarations: [app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                footer_component_1.FooterComponent,
                trendy_component_1.TrendyComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                item_component_1.ItemComponent,
                own_item_component_1.OwnItemComponent,
                new_product_component_1.NewProductComponent,
                edit_product_component_1.EditProductComponent,
                product_component_1.ProductComponent,
                cart_component_1.CartComponent,
                my_products_component_1.MyProductsComponent,
                searched_products_component_1.SearchedProductsComponent,
                orders_component_1.OrdersComponent
            ],
            bootstrap: [app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map