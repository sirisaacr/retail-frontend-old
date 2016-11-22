import { RouterModule } from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewProductComponent }        from './components/new_product/new_product.component';
import { EditProductComponent }        from './components/edit_product/edit_product.component';
import { ProductComponent }        from './components/product/product.component';
import { CartComponent }        from './components/cart/cart.component';
import { MyProductsComponent }        from './components/my_products/my_products.component';
import { SearchedProductsComponent }        from './components/searched_products/searched_products.component';
import { OrdersComponent }        from './components/orders/orders.component';


export const routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'new/product', component: NewProductComponent },
    { path: 'edit/product/:id', component: EditProductComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'my_products', component: MyProductsComponent },
    { path: 'search', component: SearchedProductsComponent },
    { path: 'orders', component: OrdersComponent }
];


export default RouterModule.forRoot(routes);