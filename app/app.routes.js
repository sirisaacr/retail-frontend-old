"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require('./components/home/home.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var new_product_component_1 = require('./components/new_product/new_product.component');
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'new/product', component: new_product_component_1.NewProductComponent }
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map