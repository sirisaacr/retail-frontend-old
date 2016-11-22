"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require('./components/home/home.component');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var new_product_component_1 = require('./components/new_product/new_product.component');
var edit_product_component_1 = require('./components/edit_product/edit_product.component');
var product_component_1 = require('./components/product/product.component');
var cart_component_1 = require('./components/cart/cart.component');
var my_products_component_1 = require('./components/my_products/my_products.component');
var searched_products_component_1 = require('./components/searched_products/searched_products.component');
var orders_component_1 = require('./components/orders/orders.component');
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'new/product', component: new_product_component_1.NewProductComponent },
    { path: 'edit/product/:id', component: edit_product_component_1.EditProductComponent },
    { path: 'product/:id', component: product_component_1.ProductComponent },
    { path: 'cart', component: cart_component_1.CartComponent },
    { path: 'my_products', component: my_products_component_1.MyProductsComponent },
    { path: 'search', component: searched_products_component_1.SearchedProductsComponent },
    { path: 'orders', component: orders_component_1.OrdersComponent }
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map