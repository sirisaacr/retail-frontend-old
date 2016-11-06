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
var app_component_1 = require('./components/app/app.component');
var header_component_1 = require('./components/header/header.component');
var home_component_1 = require('./components/home/home.component');
var footer_component_1 = require('./components/footer/footer.component');
var trendy_component_1 = require('./components/trendy/trendy.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var item_component_1 = require('./components/item/item.component');
var new_product_component_1 = require('./components/new_product/new_product.component');
var attribute_component_1 = require('./components/product_attributes/attribute.component');
var user_service_1 = require('./components/shared/services/user.service');
var product_service_1 = require('./components/shared/services/product.service');
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
                app_routes_1.default
            ],
            providers: [user_service_1.UserService,
                product_service_1.ProductService
            ],
            declarations: [app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                footer_component_1.FooterComponent,
                trendy_component_1.TrendyComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                item_component_1.ItemComponent,
                new_product_component_1.NewProductComponent,
                attribute_component_1.AttributeComponent
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